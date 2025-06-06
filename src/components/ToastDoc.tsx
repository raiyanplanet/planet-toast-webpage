import React, { useState } from "react";
import {
  Github,
  Package,
  Zap,
  Palette,
  Code,
  Sparkles,
  Download,
  Sun,
  Moon,
} from "lucide-react";
import CodeBlock from "./CodeBlock";
import DeveloperInfo from "./DeveloperInfo";
import logo from "../../public/logo.png";
import HomePage from "./HomePage";
import ApiRefaremce from "./ApiRefaremce";

// Mock toast library implementation for demo purposes
const createToastElement = (
  message: string,
  type: "success" | "error" | "loading" | "default" = "default"
) => {
  const toastContainer =
    document.getElementById("toast-container") ||
    (() => {
      const container = document.createElement("div");
      container.id = "toast-container";
      container.style.cssText = `
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      pointer-events: none;
    `;
      document.body.appendChild(container);
      return container;
    })();

  const toastEl = document.createElement("div");
  const colors = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error: "bg-rose-50 border-rose-200 text-rose-800",
    loading: "bg-sky-50 border-sky-200 text-sky-800",
    default: "bg-amber-50 border-amber-200 text-amber-800",
  };

  const icons = {
    success: "✓",
    error: "✕",
    loading: "⟳",
    default: "ℹ",
  };

  toastEl.className = `flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg mb-2 transform transition-all duration-300 ${colors[type]}`;
  toastEl.style.cssText = `
    pointer-events: auto;
    min-width: 320px;
    max-width: 500px;
    animation: slideIn 0.3s ease-out;
    backdrop-filter: blur(10px);
  `;

  toastEl.innerHTML = `
    <div class="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full ${
      type === "success"
        ? "bg-emerald-400"
        : type === "error"
        ? "bg-rose-400"
        : type === "loading"
        ? "bg-sky-400"
        : "bg-amber-400"
    } text-white text-xs font-bold">
      ${icons[type]}
    </div>
    <div class="flex-1 text-sm font-medium">${message}</div>
    <button class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors" onclick="this.parentElement.remove()">✕</button>
  `;

  // Add CSS animation if not exists
  if (!document.getElementById("toast-styles")) {
    const style = document.createElement("style");
    style.id = "toast-styles";
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  toastContainer.appendChild(toastEl);

  // Auto remove after 4 seconds (except loading)
  if (type !== "loading") {
    setTimeout(() => {
      toastEl?.remove();
    }, 4000);
  }

  return Date.now().toString();
};

const toast = {
  success: (message: string) => createToastElement(message, "success"),
  error: (message: string) => createToastElement(message, "error"),
  loading: (message: string) => createToastElement(message, "loading"),
  dismiss: (toastId: string) => {
    console.log("Dismissing toast:", toastId); // Use the parameter
    const container = document.getElementById("toast-container");
    if (container && container.children.length > 0) {
      container.children[0]?.remove();
    }
  },
  promise: (promise: Promise<any>, messages: any) => {
    createToastElement(messages.loading, "loading");
    promise
      .then(() => createToastElement(messages.success, "success"))
      .catch(() => createToastElement(messages.error, "error"))
      .finally(() => {
        // Clean up loading toast
        setTimeout(() => {
          const container = document.getElementById("toast-container");
          if (container) {
            Array.from(container.children).forEach((child) => {
              if (child.textContent?.includes(messages.loading)) {
                child.remove();
              }
            });
          }
        }, 100);
      });
  },
};

// Add default toast function
Object.assign(toast, (message: string) =>
  createToastElement(message, "default")
);

const ToastDemo: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }> = ({ icon, title, description }) => (
    <div className="bg-cream-50 dark:bg-stone-800 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-stone-100 dark:border-stone-700">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-300 dark:to-orange-300 rounded-2xl text-amber-800 dark:text-amber-900">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100">
          {title}
        </h3>
      </div>
      <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
        {description}
      </p>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-stone-900" : "bg-cream-25"
      }`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-amber-100/50 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-300 dark:to-orange-300 rounded-xl flex items-center justify-center shadow-sm">
                <img src={logo} alt="" />
              </div>
              <div>
                <h1 className="text-2xl max-md:text-xl font-bold text-stone-800 dark:text-stone-100">
                  Planet Toast
                </h1>
                <p className="text-sm text-stone-600 dark:text-stone-400 max-md:hidden">
                  Beautiful toast notifications for React
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 max-md:p-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors border border-stone-200 dark:border-stone-600">
                {darkMode ? (
                  <Sun size={20} className="text-amber-500" />
                ) : (
                  <Moon size={20} className="text-stone-600" />
                )}
              </button>

              <a
                href="https://github.com/raiyanplanet/planet-toast"
                className="flex items-center gap-2 px-6 py-3 max-md:px-2 max-md:py-2 bg-stone-800 dark:bg-amber-300 text-stone-100 dark:text-stone-800 rounded-xl hover:bg-stone-700 dark:hover:bg-stone-200 transition-colors font-medium">
                <Github size={20} />
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/planet-toast"
                className="flex items-center gap-2 text-stone-400 hover:text-amber-300 transition-colors max-md:hidden">
                <Package size={20} />
                npm
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HomePage />

      {/* Installation */}
      <section
        id="installation"
        className="py-24 bg-cream-25 dark:bg-stone-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-stone-800 dark:text-stone-100 mb-6">
              Quick Start
            </h2>
            <p className="text-xl text-stone-600 dark:text-stone-400">
              Get up and running in less than 2 minutes
            </p>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-300 dark:to-orange-300 rounded-xl">
                  <Download
                    className="text-amber-800 dark:text-amber-900"
                    size={24}
                  />
                </div>
                Installation
              </h3>
              <div className=" flex flex-col gap-5">
                <CodeBlock language="tsx" code={`npm install planet-toast`} />
                <CodeBlock language="tsx" code={`bun add planet-toast`} />
                <CodeBlock language="tsx" code={`pnpm install planet-toast`} />
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-300 dark:to-orange-300 rounded-xl">
                  <Code
                    className="text-amber-800 dark:text-amber-900"
                    size={24}
                  />
                </div>
                Setup
              </h3>
              <CodeBlock
                code={`import React from 'react';
import { Toaster } from 'planet-toast';

function App() {
  return (
    <div>
      {/* Your app content */}
      <Toaster />
    </div>
  );
}`}
              />
            </div>

            <div>
              <h3 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-300 dark:to-orange-300 rounded-xl">
                  <Zap
                    className="text-amber-800 dark:text-amber-900"
                    size={24}
                  />
                </div>
                Usage
              </h3>
              <CodeBlock
                language="tsx"
                code={`import { toast } from 'planet-toast';

function MyComponent() {
  const handleClick = () => {
    toast.success('Hello World!');
  };

  return (
    <button onClick={handleClick}>
      Show Toast
    </button>
  );
}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-cream-50 dark:bg-stone-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-stone-800 dark:text-stone-100 mb-6">
              Why Planet Toast?
            </h2>
            <p className="text-xl text-stone-600 dark:text-stone-400">
              Everything you need for perfect toast notifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Palette size={28} />}
              title="Beautiful Design"
              description="Modern, clean design with smooth animations and perfect contrast ratios that feel natural and delightful"
            />
            <FeatureCard
              icon={<Code size={28} />}
              title="TypeScript Ready"
              description="Full TypeScript support with comprehensive type definitions out of the box for better developer experience"
            />
            <FeatureCard
              icon={<Zap size={28} />}
              title="Zero Dependencies"
              description="Lightweight library with no external dependencies, keeping your bundle size minimal and performance optimal"
            />
            <FeatureCard
              icon={<Sparkles size={28} />}
              title="Smooth Animations"
              description="Buttery smooth animations with CSS transforms and optimized performance for seamless user experience"
            />
            <FeatureCard
              icon={<Download size={28} />}
              title="Promise Support"
              description="Built-in promise handling for async operations with loading, success, and error states automatically managed"
            />
            <FeatureCard
              icon={<Sun size={28} />}
              title="Flexible Positioning"
              description="Six different positioning options to place toasts exactly where you want them in your application"
            />
          </div>
        </div>
      </section>

      {/* API Reference */}
      <ApiRefaremce />

      {/* Examples */}
      <section className="py-24 bg-cream-50 dark:bg-stone-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-stone-800 dark:text-stone-100 mb-6">
              Examples
            </h2>
            <p className="text-xl text-stone-600 dark:text-stone-400">
              Real-world examples to get you started quickly
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-6">
                Form Submission
              </h3>
              <CodeBlock
                code={`const handleSubmit = async (formData) => {
  const promise = fetch('/api/submit', {
    method: 'POST',
    body: JSON.stringify(formData)
  });

  toast.promise(promise, {
    loading: 'Submitting form...',
    success: (data) => \`Form submitted successfully! ID: \${data.id}\`,
    error: (err) => \`Failed to submit: \${err.message}\`
  });
};`}
              />
            </div>

            <div className="w-full break-words">
              <h3 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-6">
                File Upload
              </h3>
              <CodeBlock
                code={`const uploadFile = async (file) => {
  const uploadPromise = new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    
    fetch('/api/upload', { method: 'POST', body: formData })
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
  });

  toast.promise(uploadPromise, {
    loading: 'Uploading file...',
    success: 'File uploaded successfully!',
    error: 'Upload failed. Please try again.'
  });
};`}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-cream-50 flex items-center justify-center dark:bg-stone-800 w-full text-amber-50 px-10">
        <DeveloperInfo />
      </section>
      {/* Footer */}
      <footer className="bg-stone-100 text-stone-900  dark:bg-stone-900 dark:text-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl flex items-center justify-center shadow-sm">
                <img src={logo} alt="" />
              </div>
              <div>
                <h3 className="text-xl font-bold dark:text-stone-100">
                  Planet Toast
                </h3>
                <p className="dark:text-stone-400 text-sm">
                  Beautiful toast notifications for React
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <a
                href="https://github.com/raiyanplanet/planet-toast"
                className="flex items-center gap-2 dark:text-stone-400 hover:text-amber-300 transition-colors">
                <Github size={20} />
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/planet-toast"
                className="flex items-center gap-2 dark:text-stone-400 hover:text-amber-300 transition-colors">
                <Package size={20} />
                npm
              </a>
            </div>
          </div>
          <div className="border-t border-stone-700 mt-12 pt-8 text-center dark:text-stone-400">
            <p>
              &copy; 2025 Planet Toast. Made with ❤️ for the React community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ToastDemo;
