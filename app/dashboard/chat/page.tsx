"use client";

import { useState, useRef, useEffect } from "react";
import { Send, RefreshCw, Shield, AlertTriangle } from "lucide-react";
import AuditMarkdown from "@/components/ui/AuditMarkdown";
import ExploitSimulator from "@/components/ui/ExploitSimulator";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_PROMPTS = [
  "Show me a vulnerable SQL query template in Node.js Express, explain how an attacker exploits it, and provide a secure prepared statement patch.",
  "What is the difference between stored and reflected XSS? Show PHP examples of both.",
  "Explain CSRF attacks and how to implement proper token-based mitigation in a Laravel app.",
  "Audit this login function for security issues: <?php $sql = \"SELECT * FROM users WHERE email='$_POST[email]'\";",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSimulator, setShowSimulator] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `${res.status} ${res.statusText}`);

      setMessages((prev) => [...prev, { role: "assistant", content: data.result }]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-6 flex flex-col">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex flex-col flex-1 gap-4">

        {/* Header */}
        <div className="flex items-center justify-between py-2">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/20">
                <Shield size={14} className="text-emerald-400" />
              </div>
              <h1 className="text-base font-black text-ink">Campus Dive AI Security Auditor</h1>
            </div>
            <p className="text-[11px] text-ink-muted ml-8">Ask anything about web security, code vulnerabilities, or attack patterns</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSimulator((v) => !v)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-ink-muted hover:text-ink border border-white/5 transition-all"
            >
              {showSimulator ? "Hide" : "Show"} Simulator
            </button>
            {messages.length > 0 && (
              <button
                onClick={() => { setMessages([]); setError(""); }}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-ink-muted hover:text-ink border border-white/5 transition-all flex items-center gap-1"
              >
                <RefreshCw size={11} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Exploit Simulator */}
        {showSimulator && <ExploitSimulator />}

        {/* Messages */}
        <div className="flex-1 bg-zinc-950/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[420px] max-h-[60vh]">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center gap-6 py-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                    <Shield size={22} className="text-emerald-400" />
                  </div>
                  <p className="text-ink font-bold text-sm mb-1">Security Auditor Ready</p>
                  <p className="text-ink-muted text-xs max-w-xs">Ask a security question or choose a prompt below to get started.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 w-full max-w-2xl">
                  {STARTER_PROMPTS.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(p)}
                      className="text-left text-xs text-ink-muted hover:text-ink bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-white/15 rounded-xl px-3 py-2.5 transition-all leading-relaxed"
                    >
                      {p.length > 90 ? p.slice(0, 87) + "…" : p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                    <Shield size={12} className="text-emerald-400" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === "user"
                      ? "bg-primary/20 border border-primary/30 text-ink"
                      : "bg-zinc-900/80 border border-white/5 text-ink-muted"
                  }`}
                >
                  {msg.role === "user" ? (
                    <span className="font-medium">{msg.content}</span>
                  ) : (
                    <AuditMarkdown content={msg.content} />
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center ml-2 mt-0.5 shrink-0">
                    <span className="text-[10px] font-bold text-primary-light">YOU</span>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                  <Shield size={12} className="text-emerald-400" />
                </div>
                <div className="bg-zinc-900/80 border border-white/5 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-ink-muted">Analysing...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-xs">
                <AlertTriangle size={14} />
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/5 p-3 bg-zinc-950/60">
            <div className="flex gap-2 items-end">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a security question or paste code to audit… (Shift+Enter for new line)"
                rows={2}
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-emerald-500/50 resize-none transition-colors font-mono"
                disabled={loading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-white/5 disabled:to-white/5 disabled:text-ink-faint text-white transition-all shrink-0"
              >
                {loading ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
            <p className="text-[10px] text-ink-faint mt-1.5 text-center">
              AI responses may contain errors. Always verify security advice independently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
