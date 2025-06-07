import { motion, type Variants } from "motion/react";
import logo from "../../public/logo.png";
import { Github, Package } from "lucide-react";

const Footer = () => {
  const leftsection: Variants = {
    offscreen: {
      scale: 0,
    },
    onscreen: {
      scale: 1,

      transition: {
        type: "spring",
        bounce: 0.01,
        duration: 0.8,
      },
    },
  };

  return (
    <>
      <motion.footer className="bg-stone-100 text-stone-900  dark:bg-stone-900 dark:text-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              variants={leftsection}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ amount: 0.4 }}
              className="flex items-center gap-4 mb-6 md:mb-0">
              <motion.div
                variants={leftsection}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ amount: 0.4 }}
                className="max-md:w-12 w-15 bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl flex items-center justify-center shadow-sm">
                <img src={logo} alt="" />
              </motion.div>
              <div>
                <h3 className="max-md:text-xl text-3xl font-bold dark:text-stone-100">
                  Planet Toast
                </h3>
                <motion.p
                  variants={leftsection}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ amount: 0.4 }}
                  className="dark:text-stone-400 max-md:text-sm text-[18px]">
                  Beautiful toast notifications for React
                </motion.p>
              </div>
            </motion.div>
            <div className="flex items-center gap-8">
              <a
                href="https://github.com/raiyanplanet/planet-toast"
                className="flex items-center gap-2 dark:text-stone-400 hover:text-amber-300 transition-colors text-2xl max-md:text-xl">
                <Github />
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/planet-toast"
                className="flex items-center gap-2 dark:text-stone-400 hover:text-amber-300 transition-colors text-2xl max-md:text-xl">
                <Package />
                npm
              </a>
            </div>
          </div>
          <div className="border-t border-stone-700 mt-12 pt-8 text-center dark:text-stone-400 text-xl max-md:text-sm">
            <p>
              &copy; 2025 Planet Toast. Made with ❤️ for the React community.
            </p>
          </div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
