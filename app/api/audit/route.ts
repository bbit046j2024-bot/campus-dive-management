import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { checkRateLimit } from "@/lib/rateLimit";

const SYSTEM_PROMPT = `You are a professional security engineer and software architect with experience auditing web applications and writing developer-facing guidance. Always:
- Prioritize safety and avoid providing exploit code or step-by-step instructions that facilitate attacks.
- Use only the context and documents provided in the request unless the user asks for general best practices.
- When analyzing code or architecture, produce: (1) summary of the component, (2) potential vulnerabilities with severity (Low/Medium/High/Critical), (3) actionable fixes with sample code or configuration changes, (4) tests to verify the fix, and (5) a short checklist of next steps.
- Cite any source documents or code snippets included (e.g., 'source: app/middleware.ts#L1-L10') and clearly label which suggestions require privileged keys or deploy-time changes.
- If the request involves secrets or credentials, refuse to reveal or recreate them; instead instruct how to rotate or store secrets safely.
- If the user asks for architectural changes that may affect privacy/compliance, list regulatory implications (e.g., GDPR, CCPA) and recommend safe defaults.
- Ask clarifying questions if the provided context is insufficient.`;

export async function POST(req: NextRequest) {
  try {
    // 1. Enforce Clerk Authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Rate Limiting Check
    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
    const { allowed, remaining } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait before making another request." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages, codeSnippet } = body as {
      messages?: { role: "user" | "assistant"; content: string }[];
      codeSnippet?: string;
    };

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key is not configured." }, { status: 500 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 3. Extract target text to validate size limits and run Moderation API
    let textToModerate = "";
    if (messages && messages.length > 0) {
      textToModerate = messages[messages.length - 1].content;
    } else if (codeSnippet) {
      textToModerate = codeSnippet;
    }

    // Enforce size limit
    const SIZE_LIMIT = 8000;
    if (textToModerate.length > SIZE_LIMIT) {
      return NextResponse.json(
        { error: `Input size exceeds the maximum limit of ${SIZE_LIMIT} characters.` },
        { status: 400 }
      );
    }

    // Run Moderation Check
    if (textToModerate) {
      const moderation = await client.moderations.create({ input: textToModerate });
      if (moderation.results[0]?.flagged) {
        console.error("OpenAI Moderation flagged content metadata:", JSON.stringify(moderation.results[0]));
        return NextResponse.json(
          { error: "Request blocked: Content violates safety guidelines." },
          { status: 400 }
        );
      }
    }

    // 4. Build the conversation history with prefix
    let history: { role: "user" | "assistant" | "system"; content: string }[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (messages && messages.length > 0) {
      const mapped = messages.map((m, idx) => {
        if (m.role === "user" && idx === messages.length - 1) {
          return {
            role: m.role,
            content: `SecurityMode: DO NOT provide exploit code; only show remediation. ${m.content}`,
          };
        }
        return m;
      });
      history = [...history, ...mapped];
    } else if (codeSnippet) {
      history.push({
        role: "user",
        content: `SecurityMode: DO NOT provide exploit code; only show remediation. Please perform a comprehensive security audit on the following code:\n\`\`\`\n${codeSnippet}\n\`\`\``,
      });
    } else {
      return NextResponse.json({ error: "No messages or code provided." }, { status: 400 });
    }

    // 5. OpenAI API Completion Call
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.1,
      max_tokens: 1500,
      messages: history,
    });

    const reply = completion.choices[0]?.message?.content ?? "No response generated.";

    return NextResponse.json({ result: reply, remaining }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
