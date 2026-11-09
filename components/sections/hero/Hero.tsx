"use client";

import SectionLayout from "../../shared/layout/SectionLayout";
import HeroContent from "./HeroContent";
import Terminal from "./Terminal";

const Hero = () => (
  <SectionLayout
    id="hero"
    className="min-h-screen pb-16 pt-32 sm:pb-20"
    containerClassName="flex min-h-[calc(100vh-12rem)] items-center"
    paddingY=""
  >
    <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
      <HeroContent />
      <div className="w-full min-w-0 lg:justify-self-end">
        <Terminal />
      </div>
    </div>
  </SectionLayout>
);

export default Hero;
