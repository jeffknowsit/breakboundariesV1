import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add("transition-colors", "duration-300");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);

      // Add ripple effect
      const ripple = document.createElement("div");
      ripple.className = "theme-change-ripple";
      document.body.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        document.body.removeChild(ripple);
      }, 1000);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --theme-transition-duration: 300ms;
        }

        .theme-change-ripple {
          position: fixed;
          top: var(--click-y, 50%);
          left: var(--click-x, 50%);
          transform: translate(-50%, -50%) scale(0);
          width: 300vmax;
          height: 300vmax;
          background: radial-gradient(
            circle,
            var(--ripple-color, rgba(255, 255, 255, 0.1)) 0%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 9999;
          animation: ripple 1s ease-out forwards;
        }

        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }

        *, *::before, *::after {
          transition-property: background-color, border-color, color, fill, stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: var(--theme-transition-duration);
        }

        .no-theme-transition {
          transition: none !important;
        }

        :root {
          --background: 0 0% 100%;
          --foreground: 222.2 84% 4.9%;
          color-scheme: light;
        }

        .dark {
          --background: 222.2 84% 4.9%;
          --foreground: 0 0% 100%;
          color-scheme: dark;
        }

        html {
          scroll-behavior: smooth;
        }

        .dark * {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}} />
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
