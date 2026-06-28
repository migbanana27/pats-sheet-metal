"use client";

import { AnimatePresence, motion } from "framer-motion";
import { NavProvider, useNav } from "@/components/site/nav-context";
import { GrainOverlay } from "@/components/site/grain-overlay";
import { PhoneCallHandler } from "@/components/site/phone-call-handler";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { StickyCta } from "@/components/site/sticky-cta";
import { HomeView } from "@/components/site/views/home-view";
import { AboutView } from "@/components/site/views/about-view";
import { ServicesView } from "@/components/site/views/services-view";
import { GalleryView } from "@/components/site/views/gallery-view";
import { ServiceAreasView } from "@/components/site/views/service-areas-view";
import { ReviewsView } from "@/components/site/views/reviews-view";
import { TeamView } from "@/components/site/views/team-view";
import { FaqView } from "@/components/site/views/faq-view";
import { ContactView } from "@/components/site/views/contact-view";

function ViewRouter() {
  const { view } = useNav();

  const render = () => {
    switch (view) {
      case "about":
        return <AboutView />;
      case "services":
        return <ServicesView />;
      case "gallery":
        return <GalleryView />;
      case "areas":
        return <ServiceAreasView />;
      case "reviews":
        return <ReviewsView />;
      case "team":
        return <TeamView />;
      case "faq":
        return <FaqView />;
      case "contact":
        return <ContactView />;
      case "home":
      default:
        return <HomeView />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={view}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="flex-1"
      >
        {render()}
      </motion.main>
    </AnimatePresence>
  );
}

export default function Page() {
  return (
    <NavProvider>
      <GrainOverlay />
      <PhoneCallHandler />
      <SiteHeader />
      <ViewRouter />
      <SiteFooter />
      <StickyCta />
    </NavProvider>
  );
}
