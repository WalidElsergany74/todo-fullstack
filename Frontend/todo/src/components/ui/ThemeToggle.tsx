"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;

  const icons = {
    light:  <Sun className="h-4 w-4" />,
    dark:   <Moon className="h-4 w-4" />,
    system: <Monitor className="h-4 w-4" />,
  };

  const next  = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const label = `Switch to ${next} mode`;

  return (
    <Button
      id="theme-toggle"
      variant="outline"
      size="icon"
      onClick={() => setTheme(next)}
      title={label}
      aria-label={label}
    >
      {icons[theme as keyof typeof icons] ?? icons.system}
    </Button>
  );
}
