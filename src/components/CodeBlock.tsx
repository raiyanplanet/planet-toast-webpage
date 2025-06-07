import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check } from "lucide-react"; // Optional: lucide icons
import { motion, type Variants } from "motion/react";

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

  const cardVariants: Variants = {
    offscreen: {
      translateX: -100,
    },
    onscreen: {
      translateX: 0,

      transition: {
        type: "spring",
        bounce: 0.001,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.4 }}
      className="relative rounded-2xl overflow-hidden  dark:border-stone-700 text-wrap dark:bg-stone-800 bg-stone-900">
      <motion.div className="flex items-center justify-between px-4 py-2 bg-stone-100 dark:bg-stone-700 border-b border-stone-300 dark:border-stone-600">
        <span className="text-xl font-mono text-stone-600 dark:text-stone-300">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xl text-stone-500 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 transition-colors">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </motion.div>
      <SyntaxHighlighter
        language={language}
        style={dracula}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",

          fontFamily: "monospace",
          whiteSpace: "pre-wrap", // Allow wrapping
          wordBreak: "break-word", // Break long words if needed
          overflowWrap: "break-word", // Extra safety for wrapping
        }}>
        {code}
      </SyntaxHighlighter>
    </motion.div>
  );
};

export default CodeBlock;
