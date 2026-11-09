"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionLayout } from "../../shared/layout";
import { OverlayReveal, SectionHeader } from "../../shared/ui";

interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  details: string[];
  credentialUrl?: string;
}

const Education = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
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

  const educationItems = t("professionalDevelopment.items", {
    returnObjects: true,
  }) as EducationItem[];

  return (
    <SectionLayout id="professional-development" className="select-none">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <SectionHeader
          title={t("professionalDevelopment.title")}
          align="left"
          overlayDelay={0.2}
        />

        <div className="max-w-5xl space-y-8">
          {educationItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <OverlayReveal delay={index * 0.2}>
                <div className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors duration-300">
                  <div className="absolute -left-2.5 top-0 w-4 h-4 rounded-full bg-primary"></div>

                  <div className="pb-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg font-bold sm:text-xl">
                        {item.degree}, {item.institution}
                      </h3>
                      <span className="text-sm text-foreground/70">
                        {item.period}
                      </span>
                    </div>
                    {item.location && (
                      <p className="mb-2 text-sm italic text-foreground/70">
                        {item.location}
                      </p>
                    )}
                    {item.credentialUrl && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                      >
                        {t("professionalDevelopment.viewLink")}
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/80">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </OverlayReveal>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionLayout>
  );
};

export default Education;
