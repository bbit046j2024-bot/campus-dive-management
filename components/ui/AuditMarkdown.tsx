"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  content: string;
}

function colourSeverity(line: string): React.ReactNode {
  const patterns: [RegExp, string][] = [
    [/\*\*Critical\*\*/g, "text-red-400 font-bold"],
    [/\*\*High\*\*/g, "text-orange-400 font-bold"],
    [/\*\*Medium\*\*/g, "text-yellow-400 font-bold"],
    [/\*\*Low\*\*/g, "text-blue-400 font-bold"],
  ];

  // Replace bold markdown with styled spans
  const processed = line;
  const parts: React.ReactNode[] = [];
  let last = 0;

  const allMatches: { index: number; length: number; cls: string; label: string }[] = [];
  for (const [re, cls] of patterns) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    const reG = new RegExp(re.source, "g");
    while ((m = reG.exec(line)) !== null) {
      const raw = m[0].replace(/\*\*/g, "");
      allMatches.push({ index: m.index, length: m[0].length, cls, label: raw });
    }
  }
  allMatches.sort((a, b) => a.index - b.index);

  if (allMatches.length === 0) return processed;

  for (const match of allMatches) {
    if (match.index > last) {
      parts.push(line.slice(last, match.index));
    }
    parts.push(
      <span key={match.index} className={match.cls}>
        {match.label}
      </span>
    );
    last = match.index + match.length;
  }
  if (last < line.length) parts.push(line.slice(last));

  return <>{parts}</>;
}

export default function AuditMarkdown({ content }: Props) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={i} className="my-3 rounded-lg overflow-hidden border border-white/10 text-xs">
          <SyntaxHighlighter
            language={lang}
            style={vscDarkPlus}
            customStyle={{ margin: 0, background: "rgba(9,9,11,0.8)", fontSize: "0.78rem" }}
          >
            {codeLines.join("\n")}
          </SyntaxHighlighter>
        </div>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-sm font-bold text-ink mt-4 mb-1">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-base font-black text-ink mt-5 mb-2 border-b border-white/10 pb-1">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H1
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-lg font-black text-ink mt-5 mb-2">
          {line.slice(2)}
        </h1>
      );
      i++;
      continue;
    }

    // Bullet
    if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <li key={i} className="text-sm text-ink-muted ml-4 list-disc leading-relaxed">
          {colourSeverity(line.slice(2))}
        </li>
      );
      i++;
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
      i++;
      continue;
    }

    // Default paragraph
    elements.push(
      <p key={i} className="text-sm text-ink-muted leading-relaxed">
        {colourSeverity(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-0.5">{elements}</div>;
}
