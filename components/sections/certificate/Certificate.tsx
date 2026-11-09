"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import { SectionLayout } from "../../shared/layout";
import { OverlayReveal, SectionHeader } from "../../shared/ui";

function Certificate() {
  const { t } = useTranslation();
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false })
  );
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const certificates = [
    {
      title: t("certificate.items.sapAbap.title"),
      image: "/certificates/sap-abap-cloud-certificate.png",
      imageWidth: 994,
      imageHeight: 768,
      badge: "/sap-abap-cloud-developer.png",
      link: "https://www.credly.com/badges/f9be73ab-b9eb-4327-b0f5-cddb355fd7bf/public_url",
    },
    {
      title: t("certificate.items.sapImplementation.title"),
      image: "/certificates/sap-implementation-consultant-certificate.png",
      imageWidth: 994,
      imageHeight: 768,
      badge: "/sap-implementation-consultant.png",
      link: "https://www.credly.com/badges/053ce8ec-7a12-4fb9-9571-a9d4f19daad3/public_url",
    },
    {
      title: t("certificate.items.mcsa.title"),
      image: "/MCSA-SQL-Database-Development-Certificate.png",
      imageWidth: 2200,
      imageHeight: 1700,
      badge: "/MCSA-SQL-Database-Development.png",
      link: "https://www.credly.com/badges/031f72b9-19d5-415e-bd8e-cf21a476659d/public_url",
    },
    {
      title: t("certificate.items.azure.title"),
      image: "/Microsoft Azure Data Engineer Associate Certification.png",
      imageWidth: 2339,
      imageHeight: 1653,
      badge: "/azure-data-engineer.png",
      link: "https://www.credly.com/badges/84cf25bb-edb4-43be-b048-c3a6b74771d0/public_url",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1 },
    },
  };

  return (
    <SectionLayout id="certificate" className="select-none">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <SectionHeader
          title={t("certificate.title")}
          align="right"
          overlayDelay={0.2}
        />
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div variants={itemVariants} className="mt-6 w-full">
            <OverlayReveal>
              <div className="space-y-3">
                {certificates.map((certificate) => (
                  <div
                    key={certificate.title}
                    className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card-bg/60 p-4 transition-colors hover:border-primary/40"
                  >
                    <Image
                      src={certificate.badge}
                      alt=""
                      width={52}
                      height={52}
                      className="size-12 shrink-0 rounded-lg object-contain"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <p className="break-words text-sm font-medium sm:text-base">
                        {certificate.title}
                      </p>
                      <a
                        href={certificate.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit text-sm text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary-hover"
                      >
                        {t("certificate.viewCredential")}
                        <span aria-hidden="true"> ↗</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </OverlayReveal>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full min-w-0">
            <OverlayReveal wrapperClassName="w-full">
              <Carousel
                plugins={[plugin.current]}
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="ml-0">
                  {certificates.map((certificate) => (
                    <CarouselItem key={certificate.title} className="pl-0">
                      <Card className="h-[360px] overflow-hidden rounded-2xl border border-border/70 bg-card-bg/60 py-0 shadow-lg shadow-black/5 sm:h-[400px] lg:h-[420px]">
                        <CardContent className="flex h-full w-full items-center justify-center p-0">
                          <a
                            href={certificate.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${t("certificate.viewCredential")}: ${certificate.title}`}
                            className="block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                          >
                            <Image
                              src={certificate.image}
                              alt={certificate.title}
                              width={certificate.imageWidth}
                              height={certificate.imageHeight}
                              className="h-full w-full bg-white object-contain"
                            />
                          </a>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </OverlayReveal>

          </motion.div>
        </div>
      </motion.div>
    </SectionLayout>
  );
}

export default Certificate;
