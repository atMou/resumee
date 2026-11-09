import { ReactNode } from "react";

interface SectionLayoutProps {
  children: ReactNode;
  id: string;
  className?: string;
  containerClassName?: string;
  paddingY?: string;
  backgroundColor?: string;
  maxWidth?: string;
}

const SectionLayout = ({
  children,
  id,
  className = "",
  containerClassName = "",
  paddingY = "py-20 sm:py-28",
  backgroundColor = "",
  maxWidth = "max-w-7xl",
}: SectionLayoutProps) => {
  return (
    <section
      id={id}
      className={`${paddingY} ${backgroundColor} ${className}`}
    >
      <div
        className={`w-full min-w-0 ${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 xl:px-[2rem] ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionLayout;
