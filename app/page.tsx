"use client";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  About,
  Certificate,
  Contact,
  Education,
  EducationHistory,
  Experience,
  Hero,
} from "../components/sections";

export default function Home(): React.JSX.Element {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Certificate />
      <EducationHistory />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
