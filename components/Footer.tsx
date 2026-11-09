"use client";

import { useTranslation } from "react-i18next";

const Footer = (): React.JSX.Element => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-background/50 backdrop-blur-sm border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          {/* Copyright */} 
          <div className="text-center md:text-left">
            <p className="text-foreground/60 text-sm">
              © {year} Mo Salah. {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
