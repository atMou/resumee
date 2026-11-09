"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const ProjectCard = ({ project, variants }) => {
  const { t } = useTranslation();
  const router = useRouter();

  console.log("ProjectCard rendering with project:", project);

  const handleLearnMore = () => {
    router.push(`/projects/details/${project.id}`);
  };

  const videoUrl = project.videoUrl || project.video;
  const isYoutube =
    videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be");

  // Convert YouTube URL to embed format if needed
  const embedUrl = isYoutube
    ? videoUrl
        .replace("youtu.be/", "youtube.com/embed/")
        .replace("watch?v=", "embed/")
    : videoUrl;

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        whileHover={{ y: -8, rotate: 0.5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/70 bg-card-bg/70 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
        onClick={handleLearnMore}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleLearnMore();
          }
        }}
      >
        {/* Project Image or Video */}
        <div className="relative h-48 overflow-hidden border-b border-border/70 bg-gradient-to-br from-primary/10 to-transparent sm:h-56">
          {videoUrl ? (
            isYoutube ? (
              <iframe
                src={`${embedUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${embedUrl.split("/").pop()}`}
                className="w-full h-full object-cover pointer-events-none"
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <video
                src={embedUrl}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            )
          ) : (
            <Image
              src={project.image}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              alt={`${project.title} preview`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Overlay on hover for better text readability */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
        </div>

        {/* Project Content */}
        <div className="p-4 sm:p-6 relative z-10">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 transition-colors tracking-wide line-clamp-2">
            {project.title}
          </h3>

          <p className="text-primary mb-3 sm:mb-4 text-xs sm:text-sm font-medium line-clamp-2">
            {project.tech}
          </p>

          <p className="text-foreground/80 leading-relaxed mb-4 text-sm sm:text-base line-clamp-3">
            {project.desc.replace(` ${t("projects.learnMore")} >`, "")}
          </p>

          {/* Learn More Button */}
          <button
            onClick={handleLearnMore}
            className="flex items-center gap-2 text-[#7300FF] hover:text-[#8533ff] font-medium transition-colors group/btn text-sm sm:text-base"
          >
            <span>{t("projects.learnMore")}</span>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectCard;
