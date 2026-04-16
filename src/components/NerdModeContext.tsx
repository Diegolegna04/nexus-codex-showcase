import { createContext, useContext, useState, type ReactNode } from "react";

interface NerdModeContextType {
  nerdMode: boolean;
  toggleNerdMode: () => void;
}

const NerdModeContext = createContext<NerdModeContextType>({
  nerdMode: false,
  toggleNerdMode: () => {},
});

export function NerdModeProvider({ children }: { children: ReactNode }) {
  const [nerdMode, setNerdMode] = useState(false);
  return (
    <NerdModeContext.Provider value={{ nerdMode, toggleNerdMode: () => setNerdMode((p) => !p) }}>
      {children}
    </NerdModeContext.Provider>
  );
}

export const useNerdMode = () => useContext(NerdModeContext);
