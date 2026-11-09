"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { contactDetails } from "../../../data/contact";
import SectionLayout from "../../shared/layout/SectionLayout";
import OverlayReveal from "../../shared/ui/OverlayReveal";
import SocialLinks from "../../shared/ui/SocialLinks";

const Contact = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <SectionLayout
      id="contact"
      maxWidth="max-w-4xl"
      containerClassName="text-center"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div className="mb-4" variants={itemVariants}>
          <OverlayReveal trigger="whileInView" delay={0.5} duration={0.8}>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold">
              {t("contact.title")}
              <span className="text-[#7300FF]">.</span>
            </h2>
          </OverlayReveal>
        </motion.div>

        {/* Contact Description */}
        <OverlayReveal wrapperClassName="!mx-auto !block w-fit">
          <p className="text-md sm:text-lg text-light-gray mb-4 leading-relaxed max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </OverlayReveal>

        {/* Email Link */}
        <div className="mb-8">
          <OverlayReveal wrapperClassName="!mx-auto !block w-fit">
            <motion.a
              href={`mailto:${contactDetails.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-lg sm:text-xl font-medium"
            >
              <Mail aria-hidden="true" size={20} className="text-primary" />
              {contactDetails.email}
            </motion.a>
          </OverlayReveal>
          <OverlayReveal>
            <motion.a
              href={`tel:${contactDetails.phone}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 inline-flex items-center gap-2 text-lg sm:text-xl font-medium"
            >
              <Phone aria-hidden="true" size={20} className="text-primary" />
              {contactDetails.phone}
            </motion.a>
          </OverlayReveal>
        </div>

        <SocialLinks />

        {/* Footer */}
        {/* <motion.div
          className="mt-4 pt-8 border-t border-[#2E2E2E]"
          variants={itemVariants}
        >
          <p className="text-[#E4E0E0] text-sm">{t("contact.copyright")}</p>
        </motion.div> */}
      </motion.div>
    </SectionLayout>
  );
};

export default Contact;
