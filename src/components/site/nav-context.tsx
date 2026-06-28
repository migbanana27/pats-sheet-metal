"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ServiceId, ViewId } from "@/lib/site-data";

interface NavState {
  view: ViewId;
  service: ServiceId;
  navigate: (view: ViewId, service?: ServiceId) => void;
}

const DEFAULT_VIEW: ViewId = "home";

const NavContext = createContext<NavState | null>(null);

function parseHash(): { view: ViewId; service: ServiceId } {
  if (typeof window === "undefined")
    return { view: DEFAULT_VIEW, service: "fabrication" };
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [viewPart, servicePart] = raw.split("/");
  const validViews: ViewId[] = [
    "home",
    "about",
    "services",
    "gallery",
    "areas",
    "reviews",
    "team",
    "faq",
    "contact",
  ];
  const view = (validViews.includes(viewPart as ViewId)
    ? (viewPart as ViewId)
    : DEFAULT_VIEW) as ViewId;
  const validServices: ServiceId[] = ["fabrication", "hvac", "architectural"];
  const service = (validServices.includes(servicePart as ServiceId)
    ? servicePart
    : "fabrication") as ServiceId;
  return { view, service };
}

export function NavProvider({ children }: { children: React.ReactNode }) {
  // Initialize to defaults so SSR and first client render match (no hydration
  // mismatch). The real hash is read inside an effect after mount.
  const [state, setState] = useState<{ view: ViewId; service: ServiceId }>({
    view: DEFAULT_VIEW,
    service: "fabrication",
  });

  useEffect(() => {
    const apply = () => {
      const parsed = parseHash();
      setState((prev) =>
        prev.view === parsed.view && prev.service === parsed.service
          ? prev
          : parsed,
      );
    };
    apply();
    const onHashChange = () => {
      apply();
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHashChange);
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#home");
    }
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((view: ViewId, service?: ServiceId) => {
    const hash =
      service && view === "services" ? `#${view}/${service}` : `#${view}`;
    if (window.location.hash === hash) {
      // Same hash — still scroll up
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = hash;
  }, []);

  const value = useMemo<NavState>(
    () => ({ view: state.view, service: state.service, navigate }),
    [state, navigate],
  );

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
}
