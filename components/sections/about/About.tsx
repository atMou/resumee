"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { portfolioSkills } from "../../../data/portfolioSkills";
import SectionLayout from "../../shared/layout/SectionLayout";
import SectionHeader from "../../shared/ui/SectionHeader";
import SkillSection from "./SkillSection";

const About = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1 },
    },
  };

  return (
    <SectionLayout id="about">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <SectionHeader
          title={t("about.title")}
          align="left"
          overlayDelay={0.2}
        />

        <motion.div
          variants={itemVariants}
          className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2"
        >
            <SkillSection
              title={t("about.sapTechnologies")}
              icon="🏢"
              skills={portfolioSkills.sapTechnologies}
              gridCols="grid-cols-2 sm:grid-cols-3"
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />

            <SkillSection
              title={t("about.programmingLanguages")}
              icon="💻"
              skills={portfolioSkills.programmingLanguages}
              gridCols="grid-cols-2 sm:grid-cols-4"
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />

            <SkillSection
              title={t("about.markupStyling")}
              icon="💅"
              skills={portfolioSkills.markupStyling}
              gridCols="grid-cols-2 sm:grid-cols-3"
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />

            <SkillSection
              title={t("about.frontendTechnologies")}
              icon="⚛️"
              skills={portfolioSkills.frontendTechnologies}
              gridCols="grid-cols-2 sm:grid-cols-3"
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />

            <SkillSection
              title={t("about.backendTechnologies")}
              icon="🔧"
              skills={portfolioSkills.backendTechnologies}
              gridCols="grid-cols-2 sm:grid-cols-3"
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />

            <SkillSection
              title={t("about.databasesORMs")}
              icon="🗄️"
              skills={portfolioSkills.databasesORMs}
              gridCols="grid-cols-2 sm:grid-cols-3"
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />

            <SkillSection
              title={t("about.devopsTools")}
              icon="🚀"
              skills={portfolioSkills.devopsTools}
              gridCols="grid-cols-2 sm:grid-cols-4"
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
        </motion.div>
      </motion.div>
    </SectionLayout>
  );
};

export default About;
