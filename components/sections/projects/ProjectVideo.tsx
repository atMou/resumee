"use client";

import { motion } from "framer-motion";
import { ExternalLink, Loader2, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ProjectVideoProps {
  videoUrl: string;
  title: string;
}

const ProjectVideo = ({ videoUrl, title }: ProjectVideoProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!videoUrl) return null;

  const isYoutube =
    videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

  // Convert YouTube URL to embed format
  const embedUrl = isYoutube
    ? videoUrl
        .replace("youtu.be/", "youtube.com/embed/")
        .replace("watch?v=", "embed/")
    : videoUrl;

  const handleLoadVideo = () => {
    setIsLoading(true);
    setShowPlayer(true);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    setIsLoaded(true);
  };

  // Reset states when videoUrl changes
  useEffect(() => {
    setIsLoading(false);
    setIsLoaded(false);
    setShowPlayer(false);
  }, [videoUrl]);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <ExternalLink className="w-5 h-5 text-[#7300FF]" />
        <h3 className="text-xl font-semibold text-white">Live Demo Video</h3>
      </div>

      <div className="relative aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 overflow-hidden">
        {!showPlayer ? (
          // Video Thumbnail with Play Button
          <motion.div
            className="relative w-full h-full flex items-center justify-center cursor-pointer group"
            onClick={handleLoadVideo}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Video Thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-[#7300FF] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-white/80 text-sm ">Click to load video</p>
              </div>
            </div>
          </motion.div>
        ) : (
          // Player Container
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-[#7300FF] animate-spin mx-auto mb-2" />
                  <p className="text-white/80 text-sm">Loading video...</p>
                </div>
              </div>
            )}

            {isYoutube ? (
              <iframe
                ref={iframeRef}
                src={embedUrl}
                title={`${title} Demo Video`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                onLoad={handleVideoLoad}
                style={{ opacity: isLoaded ? 1 : 0 }}
              />
            ) : (
              <video
                ref={videoRef}
                src={embedUrl}
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
                onLoadedData={handleVideoLoad}
                style={{ opacity: isLoaded ? 1 : 0 }}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectVideo;
