"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { contactDetails } from "../data/contact";
import ThemeToggle from "./shared/ui/ThemeToggle";

interface NavItem {
  label: string;
  id: string;
}

const Navbar = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const contactMenuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const navItems: NavItem[] = [
    { label: t("nav.about"), id: "about" },
    {
      label: t("professionalDevelopment.title"),
      id: "professional-development",
    },
    { label: t("education.title"), id: "education" },
    { label: t("certificate.title"), id: "certificate" },
    { label: t("nav.contact"), id: "contact" },
  ];

  const scrollToSection = (sectionId: string): void => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = (): void => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    [
      "hero",
      "about",
      "certificate",
      "education",
      "professional-development",
      "experience",
      "contact",
    ].forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isOpen && !isContactOpen) return;
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsContactOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, isContactOpen]);

  useEffect(() => {
    if (!isContactOpen) return;
    const closeOnOutsideClick = (event: PointerEvent): void => {
      if (
        event.target instanceof Node &&
        !contactMenuRef.current?.contains(event.target)
      ) {
        setIsContactOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [isContactOpen]);

  const renderLinks = (mobile = false): React.JSX.Element[] =>
    navItems.map((item) => {
      const isActive = activeSection === item.id;
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => scrollToSection(item.id)}
          aria-current={isActive ? "location" : undefined}
          className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            isActive
              ? "bg-primary/10 text-primary"
              : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
          } ${mobile ? "w-full text-left" : ""}`}
        >
          {item.label}
        </button>
      );
    });

  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 lg:px-8">
        <div
          className={`flex h-[68px] items-center justify-between gap-4 rounded-2xl border px-4 transition-all duration-300 sm:px-6 ${
            isScrolled
              ? "border-border/80 bg-background/90 shadow-lg shadow-black/5 backdrop-blur-xl"
              : "border-border/60 bg-background/70 backdrop-blur-lg"
          }`}
        >
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            aria-label="Mo Salah, back to top"
            className="flex shrink-0 items-center gap-2 rounded-lg text-xl font-extrabold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:gap-3 sm:text-2xl"
          >
            <Image
              src="/sap-logo.png"
              alt="SAP"
              width={44}
              height={28}
              className="h-7 w-11 object-contain"
              priority
            />
            Mo<span className="text-primary">.</span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {renderLinks()}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <div className="relative" ref={contactMenuRef}>
              <motion.button
                type="button"
                onClick={() => setIsContactOpen((open) => !open)}
                aria-expanded={isContactOpen}
                aria-haspopup="menu"
                aria-controls="avatar-contact-menu"
                aria-label={
                  isContactOpen
                    ? "Kontaktoptionen schließen"
                    : "Kontaktoptionen öffnen"
                }
                className="flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                animate={{
                  scale: isContactOpen ? 1.15 : 1,
                  y: isContactOpen ? -3 : 0,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 22,
                  mass: 0.7,
                }}
              >
                <Image
                  src="/pass_image_preview.png"
                  alt="Mo"
                  width={36}
                  height={36}
                  className="size-8 rounded-full border border-border object-cover sm:size-9"
                  priority
                />
              </motion.button>
              <AnimatePresence>
                {isContactOpen && (
                  <motion.div
                    id="avatar-contact-menu"
                    role="menu"
                    initial={{ opacity: 0, scale: 0.7, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -4 }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 22,
                      mass: 0.7,
                    }}
                    className="absolute right-0 top-full z-50 mt-3 w-56 origin-top-right rounded-2xl border border-border bg-background/95 p-2 shadow-xl shadow-black/10 backdrop-blur-xl"
                  >
                    <a
                      href={`tel:${contactDetails.phone}`}
                      role="menuitem"
                      onClick={() => setIsContactOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Phone aria-hidden="true" size={18} className="text-primary" />
                      <span className="flex flex-col">
                        <span>Anrufen</span>
                        <span className="text-xs font-normal text-foreground/60">
                          {contactDetails.phone}
                        </span>
                      </span>
                    </a>
                    <a
                      href={`mailto:${contactDetails.email}`}
                      role="menuitem"
                      onClick={() => setIsContactOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Mail aria-hidden="true" size={18} className="text-primary" />
                      <span className="flex flex-col">
                        <span>E-Mail schreiben</span>
                        <span className="text-xs font-normal text-foreground/60">
                          {contactDetails.email}
                        </span>
                      </span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="mt-2 rounded-2xl border border-border bg-background/95 p-3 shadow-xl shadow-black/10 backdrop-blur-xl lg:hidden"
            >
              <div className="space-y-1">{renderLinks(true)}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
