import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check } from "lucide-react"; // Optional: lucide icons

type CodeBlockProps = {
  code: string;
  language?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "tsx" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 text-wrap bg-stone-900">
      <div className="flex items-center justify-between px-4 py-2 bg-stone-100 dark:bg-stone-700 border-b border-stone-300 dark:border-stone-600">
        <span className="text-sm font-mono text-stone-600 dark:text-stone-300">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-sm text-stone-500 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 transition-colors">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={dracula}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",
          fontSize: "0.875rem",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap", // Allow wrapping
          wordBreak: "break-word", // Break long words if needed
          overflowWrap: "break-word", // Extra safety for wrapping
        }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
