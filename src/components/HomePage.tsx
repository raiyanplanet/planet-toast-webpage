import React, { useState } from "react";
import {
  ChevronRight,
  Copy,
  Check,
  Github,
  Package,
  Zap,
  Palette,
  Code,
  Sparkles,
  Download,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";

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
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    loading: "bg-blue-50 border-blue-200 text-blue-800",
    default: "bg-white border-gray-200 text-gray-800",
  };

  const icons = {
    success: "✓",
    error: "✕",
    loading: "⟳",
    default: "ℹ",
  };

  toastEl.className = `flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg mb-2 transform transition-all duration-300 ${colors[type]}`;
  toastEl.style.cssText = `
    pointer-events: auto;
    min-width: 320px;
    max-width: 500px;
    animation: slideIn 0.3s ease-out;
  `;

  toastEl.innerHTML = `
    <div class="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full ${
      type === "success"
        ? "bg-green-500"
        : type === "error"
        ? "bg-red-500"
        : type === "loading"
        ? "bg-blue-500"
        : "bg-gray-500"
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
  dismiss: (id: string) => {
    const container = document.getElementById("toast-container");
    if (container && container.children.length > 0) {
      container.children[0]?.remove();
    }
  },
  promise: (promise: Promise<any>, messages: any) => {
    const loadingId = createToastElement(messages.loading, "loading");
    promise
      .then(() => createToastElement(messages.success, "success"))
      .catch(() => createToastElement(messages.error, "error"));
  },
};

// Add default toast function
Object.assign(toast, (message: string) =>
  createToastElement(message, "default")
);

const ToastDemo: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const demoToasts = () => {
    toast.success("Successfully created!");
    setTimeout(() => toast.error("Something went wrong"), 1000);
    setTimeout(() => toast.loading("Processing..."), 2000);
    setTimeout(() => {
      toast.success("All done! 🎉");
    }, 4000);
  };

  const CodeBlock: React.FC<{
    code: string;
    language?: string;
    id: string;
  }> = ({ code, language = "tsx", id }) => (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-gray-400 text-sm font-mono">{language}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          {copiedCode === id ? <Check size={16} /> : <Copy size={16} />}
          <span className="text-sm">
            {copiedCode === id ? "Copied!" : "Copy"}
          </span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-gray-300 text-sm font-mono whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );

  const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }> = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">🌍</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Planet Toast
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Beautiful toast notifications for React
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {darkMode ? (
                  <Sun size={20} className="text-yellow-500" />
                ) : (
                  <Moon size={20} className="text-gray-600" />
                )}
              </button>
              <a
                href="https://github.com/yourusername/planet-toast"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                <Github size={20} />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Sparkles size={16} />
              <span className="text-sm font-medium">
                Beautiful, Lightweight, TypeScript Ready
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Planet Toast
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
              The most beautiful and customizable toast notification library for
              React applications. Zero dependencies, full TypeScript support,
              and smooth animations out of the box.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => toast.success("Hello")}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                <Sparkles size={20} />
                Try Live Demo
              </button>
              <a
                href="#installation"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-2">
                <Download size={20} />
                Get Started
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Installation */}
      <section id="installation" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Start
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Get up and running in less than 2 minutes
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Download className="text-purple-500" size={24} />
                Installation
              </h3>
              <CodeBlock
                code="npm install planet-toast"
                language="bash"
                id="install"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Code className="text-purple-500" size={24} />
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
                id="setup"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="text-purple-500" size={24} />
                Usage
              </h3>
              <CodeBlock
                code={`import { toast } from 'planet-toast';

// Basic toast
toast('Hello World!');

// Success toast
toast.success('Profile updated successfully!');

// Error toast
toast.error('Something went wrong!');

// Loading toast
toast.loading('Uploading...');`}
                id="usage"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Planet Toast?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need for perfect toast notifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Palette size={24} />}
              title="Beautiful Design"
              description="Modern, clean design with smooth animations and perfect contrast ratios"
            />
            <FeatureCard
              icon={<Code size={24} />}
              title="TypeScript Ready"
              description="Full TypeScript support with comprehensive type definitions out of the box"
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="Zero Dependencies"
              description="Lightweight library with no external dependencies, keeping your bundle size minimal"
            />
            <FeatureCard
              icon={<Sparkles size={24} />}
              title="Smooth Animations"
              description="Buttery smooth animations with CSS transforms and optimized performance"
            />
            <FeatureCard
              icon={<Download size={24} />}
              title="Promise Support"
              description="Built-in promise handling for async operations with loading, success, and error states"
            />
            <FeatureCard
              icon={<Sun size={24} />}
              title="Flexible Positioning"
              description="Six different positioning options to place toasts exactly where you want them"
            />
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              API Reference
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Complete guide to all available methods and options
            </p>
          </div>

          <div className="space-y-12">
            {/* Basic Methods */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Basic Methods
              </h3>
              <div className="grid gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    toast(message, options?)
                  </h4>
                  <CodeBlock
                    code={`// Basic toast
toast('Hello World!');

// With options
toast('Custom duration', { duration: 6000 });`}
                    id="basic-toast"
                  />
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    toast.success / error / loading
                  </h4>
                  <CodeBlock
                    code={`// Success toast
toast.success('Profile updated!');

// Error toast
toast.error('Failed to save');

// Loading toast
const loadingId = toast.loading('Uploading...');
// Later dismiss it
toast.dismiss(loadingId);`}
                    id="typed-toasts"
                  />
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    toast.promise
                  </h4>
                  <CodeBlock
                    code={`const saveUser = async (userData) => {
  // Your async operation
  return fetch('/api/users', { method: 'POST', body: JSON.stringify(userData) });
};

toast.promise(saveUser(userData), {
  loading: 'Saving user...',
  success: 'User saved successfully!',
  error: 'Failed to save user'
});`}
                    id="promise-toast"
                  />
                </div>
              </div>
            </div>

            {/* Toaster Component */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Toaster Component
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <CodeBlock
                  code={`<Toaster
  position="top-center"      // Position: top/bottom + left/center/right
  reverseOrder={false}       // Reverse the order of toasts
  gutter={8}                 // Gap between toasts
  containerStyle={{}}        // Custom container styles
  toastOptions={{            // Default options for all toasts
    duration: 4000,
    position: 'top-center'
  }}
/>`}
                  id="toaster-props"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Examples
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Real-world examples to get you started
            </p>
          </div>

          <div className="grid gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
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
                id="form-example"
              />
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
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
                id="upload-example"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">🌍</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Planet Toast</h3>
                <p className="text-gray-400 text-sm">
                  Beautiful toast notifications for React
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/yourusername/planet-toast"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
                GitHub
              </a>
              <a
                href="https://npmjs.com/package/planet-toast"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Package size={20} />
                npm
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
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
