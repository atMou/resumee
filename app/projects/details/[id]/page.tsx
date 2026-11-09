"use client";

import FullscreenViewer from "@/components/sections/projects/FullscreenViewer";
import ProjectDetails from "@/components/sections/projects/ProjectDetails";
import ProjectGallery from "@/components/sections/projects/ProjectGallery";
import ProjectVideo from "@/components/sections/projects/ProjectVideo";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ProjectDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { i18n } = useTranslation();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await import(`@/data/projects.${i18n.language}.json`);
        const foundProject = data.default.find(
          (p) => p.id === parseInt(params.id as string)
        );
        setProject(foundProject || null);
      } catch (error) {
        console.error("Error loading project:", error);
        const fallbackData = await import("@/data/projects.en.json");
        const foundProject = fallbackData.default.find(
          (p) => p.id === parseInt(params.id as string)
        );
        setProject(foundProject || null);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [params.id, i18n.language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="text-xl text-white mb-4">Project not found</div>
        <button
          onClick={() => router.push("/#projects")}
          className="flex items-center gap-2 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/#projects")}
            className="flex items-center gap-2 text-white hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </button>
        </div>
      </div>

      {/* Project Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Project Title */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-primary text-lg sm:text-xl font-medium">
              {project.tech}
            </p>
          </div>

          {/* Project Video */}
          {(project.video || project.videoUrl) && (
            <div className="mb-8">
              <ProjectVideo
                videoUrl={project.videoUrl || project.video}
                title={project.title}
              />
            </div>
          )}

          {/* Project Details */}
          <div className="mb-12">
            <ProjectDetails project={project} />
          </div>

          Project Gallery
          {project.gallery && project.gallery.length > 0 && project.id === 1 && (
            <div>
              <ProjectGallery
                gallery={project.gallery}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                onFullscreenOpen={() => setIsFullscreen(true)}
              />
            </div>
          )}

          {/* Fullscreen Viewer */}
          {isFullscreen && project.gallery && (
            <FullscreenViewer
              isOpen={isFullscreen}
              gallery={project.gallery}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              onClose={() => setIsFullscreen(false)}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
