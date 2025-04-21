import { ToggleButtonGroup, ToggleButton } from "../ui-library/button";
import { twMerge } from "tailwind-merge";
import { useTheme } from "@ui/contexts/ThemeContext";
import { Text } from "@ui/ui-library/text";

const translation = {
  light: "Clair",
  dark: "Sombre",
  system: "Système",
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <Text className="text-gray-300/90">Thème: {translation[theme]}</Text>
      <ToggleButtonGroup
        selectionMode="single"
        selectedKeys={new Set([theme])}
        onSelectionChange={(keys) => {
          if (keys.size === 0) {
            return;
          }
          const newTheme = Array.from(keys)[0] as "light" | "dark" | "system";
          setTheme(newTheme);
        }}
        className={twMerge(
          "rounded-md",
          "transition-colors",
          "border border-gray-700/80"
        )}
      >
        <ToggleButton
          id="light"
          isIconOnly
          className="p-1 pr-2"
          aria-label="light"
        >
          <svg
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </ToggleButton>
        <ToggleButton
          id="system"
          isIconOnly
          className="p-1 pl-2 border-l-1 border-l-slate-500/50"
          aria-label="system"
        >
          <svg
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </ToggleButton>
        <ToggleButton
          id="dark"
          isIconOnly
          className="p-1 pl-2 border-l-1 border-l-slate-500/50"
          aria-label="dark"
        >
          <svg
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
