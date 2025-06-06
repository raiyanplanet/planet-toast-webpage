import React from "react";
import { Github, Twitter, MapPin, Briefcase } from "lucide-react";
import developer from "../../public/developer.png";

const DeveloperInfo: React.FC = () => {
  return (
    <>
      <div className=" text-stone-900 w-full bg-cream-50 dark:bg-stone-800 rounded-3xl gap-6 shadow-xl p-8 flex max-md:flex-col">
        {/* Profile Image */}
        <section>
          <div className="text-center mb-6 flex gap-5 items-center justify-between">
            <div className=" max-md:w-xl mx-auto mb-4 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-stone-700">
              <img src={developer} alt="" width={700} className="max-md:w-xl" />
            </div>
          </div>
        </section>

        {/* Location */}
        <section>
          <div className=" flex items-start flex-col">
            <h1 className="text-2xl font-bold  mb-1">Tawsiful Alam Raiyan</h1>
            <p className="text-stone-900 flex items-center justify-center gap-1 dark:text-stone-100">
              <Briefcase size={16} />
              Full Stack Developer
            </p>
          </div>
          <div className="flex items-start gap-2 dark:text-stone-300 mb-6">
            <MapPin size={16} />
            <span>Chattogram, Bangladesh</span>
          </div>
          {/* Bio */}
          <p className="  dark:text-stone-300 mb-8 leading-relaxed">
            Passionate full-stack developer with 5+ years of experience building
            scalable web applications. Love creating beautiful user experiences
            and robust backend systems.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/raiyanplanet"
              className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-xl hover:bg-stone-700 transition-colors font-medium">
              <Github size={18} />
              GitHub
            </a>
            <a
              href="https://x.com/raiyanplanet"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium">
              <Twitter size={18} />
              Twitter
            </a>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-stone-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">50+</div>
              <div className="text-sm text-stone-500">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">5+</div>
              <div className="text-sm text-stone-500">Years Exp</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">1.2K</div>
              <div className="text-sm text-stone-500">GitHub Stars</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DeveloperInfo;
