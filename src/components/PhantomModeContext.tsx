import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useTheme } from "./ThemeContext";

const REAL_NAME = "Diego Legnaro";
const ALIAS = "Joker";

interface PhantomModeContextType {
  active: boolean;
  activate: (source?: "konami" | "logo") => void;
  deactivate: () => void;
  displayName: string;
  short: string;
  footerTagline: string;
  triggerSlash: (label?: string) => void;
  slashState: { running: boolean; label: string; key: number };
}

const PhantomModeContext = createContext<PhantomModeContextType>({
  active: false,
  activate: () => {},
  deactivate: () => {},
  displayName: REAL_NAME,
  short: "DL",
  footerTagline: "Built with Angular in mind",
  triggerSlash: () => {},
  slashState: { running: false, label: "", key: 0 },
});

export function PhantomModeProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [slashState, setSlashState] = useState({ running: false, label: "", key: 0 });

  // Hydrate from sessionStorage so a reload exits phantom mode but soft navigations keep it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("phantom-active") === "1") {
      setActive(true);
      setTheme("phantom");
    }
  }, [setTheme]);

  // If user manually picks a non-phantom theme, exit phantom mode.
  useEffect(() => {
    if (active && theme !== "phantom") {
      setActive(false);
      sessionStorage.removeItem("phantom-active");
    }
  }, [theme, active]);

  const triggerSlash = (label = "") => {
    setSlashState((s) => ({ running: true, label, key: s.key + 1 }));
    window.setTimeout(() => setSlashState((s) => ({ ...s, running: false })), 1000);
  };

  const activate = () => {
    sessionStorage.setItem("phantom-active", "1");
    triggerSlash("INTRUDER ALERT");
    window.setTimeout(() => {
      setActive(true);
      setTheme("phantom");
    }, 350);
  };

  const deactivate = () => {
    sessionStorage.removeItem("phantom-active");
    setActive(false);
  };

  return (
    <PhantomModeContext.Provider
      value={{
        active,
        activate,
        deactivate,
        displayName: active ? ALIAS : REAL_NAME,
        short: active ? "JK" : "DL",
        footerTagline: active
          ? "The distortion has been exposed."
          : "Built with Angular in mind",
        triggerSlash,
        slashState,
      }}
    >
      {children}
    </PhantomModeContext.Provider>
  );
}

export const usePhantomMode = () => useContext(PhantomModeContext);