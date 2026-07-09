import { about } from "../content";
import SectionLabel from "./SectionLabel";

export default function AboutMe() {
  return (
    <section className="mt-16">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-display text-3xl text-paper lowercase">
          / {about.eyebrow}
        </h2>
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="mt-8 flex flex-col-reverse md:flex-row gap-10 md:gap-14 items-start">
        {/* Text Content */}
        <div className="flex-1 space-y-5 text-[15px] leading-relaxed text-muted max-w-[60ch]">
          <p dangerouslySetInnerHTML={{ __html: about.intro }} />
        </div>

        {/* Image */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-panel border border-line/50">
            {/* Using a standard img tag for simplicity based on the placeholder, but you can swap to next/image later */}
            <img
              src={about.image}
              alt="About me profile"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
