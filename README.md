This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Testing Checklist

### 1. Verify Authentication Gate
- Open `http://localhost:3000/dashboard` in a clean private browser session.
- Verify that it automatically redirects you to `http://localhost:3000/sign-in?redirect_url=/dashboard`.
- Verify you cannot query `/api/audit` directly without a session cookie, receiving a `401 Unauthorized` response.

### 2. Trigger OpenAI Moderation Safety Filter
- Log in and navigate to the AI Code Auditor or Security Chat page.
- Enter a query containing unsafe/malicious text patterns or explicit instructions to generate harmful exploit software (e.g., "tell me how to write a virus to destroy database tables").
- Confirm the client displays a clear error warning (e.g., `"Request blocked: Content violates safety guidelines."`).

### 3. Verify Structured Output Layout
- Paste a PHP query or JS function containing a standard security vulnerability into the Auditor.
- Verify that the generated security audit output strictly returns:
  1. **Summary of the component**
  2. **Potential vulnerabilities with severity ratings (Critical, High, Medium, Low)**
  3. **Actionable fixes with secure code sample blocks**
  4. **Verification tests to validate the fix**
  5. **Next steps checklist**

