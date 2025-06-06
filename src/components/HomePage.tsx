import { Download, Sparkles } from "lucide-react";
import { toast } from "planet-toast";

const HomePage = () => {
  return (
    <>
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-25 to-cream-50 dark:from-stone-800 dark:via-stone-700 dark:to-stone-800">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-amber-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cream-200 rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-100/80 dark:bg-stone-700/80 backdrop-blur-sm rounded-full mb-8 border border-amber-200/50 dark:border-stone-600/50">
                <Sparkles
                  size={16}
                  className="text-amber-600 dark:text-amber-400"
                />
                <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  Beautiful, Lightweight, TypeScript Ready
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-amber-800 via-orange-700 to-amber-600 dark:from-amber-200 dark:via-orange-200 dark:to-amber-300 bg-clip-text text-transparent">
                Planet Toast
              </h1>
              <p className="text-xl md:text-2xl text-stone-700 dark:text-stone-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                The most beautiful and customizable toast notification library
                for React applications. Zero dependencies, full TypeScript
                support, and smooth animations crafted with care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => toast.success("🥰 Welcome to planet toast")}
                  className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-amber-900 rounded-2xl font-semibold hover:from-amber-500 hover:to-orange-500 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                  <Sparkles size={20} />
                  Try Live Demo
                </button>
                <a
                  href="#installation"
                  className="px-8 py-4 bg-transparent border-2 border-amber-400 dark:border-amber-300 text-amber-700 dark:text-amber-300 rounded-2xl font-semibold hover:bg-amber-400 hover:text-amber-900 dark:hover:bg-amber-300 dark:hover:text-amber-900 transition-all duration-300 flex items-center justify-center gap-2">
                  <Download size={20} />
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
