"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

const resumeUrl =
  "https://drive.google.com/file/d/1iARkPCaMqisBACycA-XKW7Rz2lo4Grmu/view?usp=drive_link";

const HeroContent = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="w-full min-w-0 text-left"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="mb-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
        {t("hero.subtitle")}{" "}
        <span className="text-primary">{t("hero.title")}</span>
      </h1>
      <p className="max-w-3xl text-base leading-relaxed text-foreground/70 sm:text-lg">
        <Trans
          i18nKey="hero.description"
          components={{
            sap: <strong className="font-semibold text-primary" />,
          }}
        />
      </p>
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t("hero.resume")}
        <ArrowUpRight aria-hidden="true" size={16} />
      </a>
    </motion.div>
  );
};

export default HeroContent;
