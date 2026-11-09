"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionLayout from "../../shared/layout/SectionLayout";
import OverlayReveal from "../../shared/ui/OverlayReveal";
import SectionHeader from "../../shared/ui/SectionHeader";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
  institutionUrl?: string;
}

const EducationHistory = () => {
  const { t } = useTranslation();
  const educationItems = t("education.items", {
    returnObjects: true,
  }) as EducationItem[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <SectionLayout id="education" className="select-none">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <SectionHeader title={t("education.title")} align="left" />

        <div className="max-w-5xl space-y-8">
          {educationItems.map((item, index) => (
            <motion.div key={item.degree} variants={itemVariants}>
              <OverlayReveal delay={index * 0.2}>
                <article className="relative border-l-2 border-primary/30 pl-8 pb-6 transition-colors duration-300 hover:border-primary">
                  <div className="absolute -left-2.5 top-0 h-4 w-4 rounded-full bg-primary" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-bold sm:text-xl">
                      {item.degree}
                      {item.institutionUrl && (
                        <a
                          href={item.institutionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                        >
                          {t("education.viewLink")}
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </h3>
                    <span className="text-sm text-foreground/70">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm italic text-foreground/70">
                    {item.location}
                  </p>
                  <p className="mt-1 text-sm text-foreground/80">
                    {item.institution}
                  </p>
                  {item.description && (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/80">
                      <li>{item.description}</li>
                    </ul>
                  )}
                </article>
              </OverlayReveal>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionLayout>
  );
};

export default EducationHistory;
