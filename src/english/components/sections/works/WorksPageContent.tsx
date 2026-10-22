import { PageHero } from "@/english/components/sections/PageHero";
import { WorksGallery } from "@/english/components/sections/works/WorksGallery";

/** The same portfolio introduction, filters, search, and projects in versions 1 and 2. */
export function WorksPageContent() {
  return (
    <>
      <PageHero
        title={"Turning business challenges into digital solutions"}
        text={"We combine data, AI, design, and systems development to build solutions that make a real impact."}
        cta={"Talk to us"}
        height={391}
        textHeight={50}
        lines={{
          left: {
            src: "/icons/works-hero-lines-left.svg",
            width: 516,
            height: 237,
            top: 0,
          },
          right: {
            src: "/icons/works-hero-lines-right.svg",
            width: 495,
            height: 281,
            top: 110.522,
          },
        }}
      />
      <WorksGallery />
    </>
  );
}
