import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon, SunMoon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{
            scale: theme === "light" ? 1 : 0,
            opacity: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : 180,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center text-yellow-500"
        >
          <Sun className="w-5 h-5" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : -180,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center text-blue-400"
        >
          <Moon className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Background animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-100 dark:from-blue-900 dark:to-blue-700 opacity-0"
        animate={{
          opacity: [0, 0.2, 0],
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
      />

      {/* Ripple effect */}
      <motion.div
        initial={false}
        animate={{
          scale: [1, 2],
          opacity: [1, 0],
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
          times: [0, 1],
        }}
        className="absolute inset-0 rounded-full bg-current opacity-0"
      />
    </motion.button>
  );
}
