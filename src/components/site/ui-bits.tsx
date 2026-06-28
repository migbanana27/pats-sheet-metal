"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Phone } from "lucide-react";
import { useNav } from "./nav-context";
import type { ViewId } from "@/lib/site-data";
import { SHOP } from "@/lib/site-data";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-4xl font-bold leading-[0.95] text-foreground sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

interface ForgeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "forge" | "outline" | "ghost" | "silver";
  size?: "default" | "lg" | "sm";
  className?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit";
}

export function ForgeButton({
  children,
  onClick,
  href,
  variant = "forge",
  size = "default",
  className,
  icon,
  type = "button",
}: ForgeButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 font-display uppercase tracking-wider font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forge focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none";

  const sizes = {
    sm: "px-4 py-2 text-xs",
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    forge:
      "bg-forge text-black hover:bg-[#ff7a2e] hover:-translate-y-0.5 shadow-[0_8px_30px_-8px_rgba(255,94,0,0.6)]",
    outline:
      "border border-silver/40 text-silver hover:border-forge hover:text-forge hover:bg-forge/5",
    ghost: "text-silver hover:text-forge",
    silver:
      "bg-silver text-black hover:bg-white hover:-translate-y-0.5",
  };

  const cls = cn(base, sizes[size], variants[variant], className);

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
        {icon ?? <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
      {icon ?? <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
    </button>
  );
}

/** CTA that navigates to the contact/quote view. */
export function QuoteCta({
  label = "Request a Custom Quote",
  variant = "forge",
  size = "default",
  className,
}: {
  label?: string;
  variant?: ForgeButtonProps["variant"];
  size?: ForgeButtonProps["size"];
  className?: string;
}) {
  const { navigate } = useNav();
  return (
    <ForgeButton
      variant={variant}
      size={size}
      className={className}
      onClick={() => navigate("contact")}
    >
      {label}
    </ForgeButton>
  );
}

/** Secondary phone CTA. */
export function CallCta({
  label = "Call the Shop",
  variant = "outline",
  size = "default",
  className,
}: {
  label?: string;
  variant?: ForgeButtonProps["variant"];
  size?: ForgeButtonProps["size"];
  className?: string;
}) {
  return (
    <ForgeButton
      variant={variant}
      size={size}
      className={className}
      href={SHOP.phoneHref}
      icon={<Phone className="size-4" />}
    >
      {label}
    </ForgeButton>
  );
}

/** Internal nav link button. */
export function NavCta({
  to,
  label,
  variant = "outline",
  size = "default",
  className,
}: {
  to: ViewId;
  label: string;
  variant?: ForgeButtonProps["variant"];
  size?: ForgeButtonProps["size"];
  className?: string;
}) {
  const { navigate } = useNav();
  return (
    <ForgeButton
      variant={variant}
      size={size}
      className={className}
      onClick={() => navigate(to)}
    >
      {label}
    </ForgeButton>
  );
}
