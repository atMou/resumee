"use client";

import { motion } from "framer-motion";
import OverlayReveal from "../../shared/ui/OverlayReveal";
import SkillBadge from "./SkillBadge";

const SkillSection = ({
  title,
  icon,
  skills,
  gridCols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3",
  containerVariants,
  itemVariants,
}) => {
  return (
    <div className="flex w-full gap-4 rounded-2xl border border-border/70 bg-card-bg/60 p-4 transition-colors duration-300 hover:border-primary/30 sm:p-5">
      {/* Icon Column */}
      <div className="flex-shrink-0">
        <div className="px-2 py-1 text-sm">{icon}</div>
      </div>

      {/* Title and Skills Column */}
      <div className="flex-1">
        <OverlayReveal>
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">
            {title}
          </h3>
          <motion.div
            className={`grid ${gridCols} w-full gap-2 sm:gap-4`}
            variants={containerVariants}
          >
            {skills.map((skill, index) => (
              <SkillBadge key={skill} skill={skill} variants={itemVariants} />
            ))}
          </motion.div>
        </OverlayReveal>
      </div>
    </div>
  );
};

export default SkillSection;
