const THEME_STORAGE_KEY = "theme";
const THEME_COLORS = {
  dark: "#1b1b1b",
  light: "#ffffff",
};

const getThemeColorMeta = () =>
  document.querySelector('meta[name="theme-color"]');

const updateHTMLTheme = (mode) => {
  const themeColorMeta = getThemeColorMeta();
  const isDark = mode === "dark";

  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.classList.toggle("light", !isDark);

  if (themeColorMeta) {
    themeColorMeta.content = THEME_COLORS[mode];
  }
};

const updateAriaLabel = (toggle, isDark) => {
  toggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
};

const updateToggleIcon = (iconElem, mode) => {
  iconElem.classList.remove("light", "dark");
  iconElem.classList.add(mode, "duration-300");
};

const saveTheme = (theme) => {
  const themeData = {
    theme,
    timestamp: Date.now(),
  };
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeData));
};

const clearSavedTheme = () => {
  localStorage.removeItem(THEME_STORAGE_KEY);
};

const init = () => {
  const toggle = document.getElementById("theme-toggle");
  const iconElem = document.getElementById("theme-circle");

  if (!toggle || !iconElem) return;

  let currentMode = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

  if (currentMode === "dark") {
    iconElem.classList.remove("light");
    iconElem.classList.add("dark");
  }

  updateAriaLabel(toggle, currentMode === "dark");

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    const newMode = e.matches ? "dark" : "light";
    updateHTMLTheme(newMode);
    updateToggleIcon(iconElem, newMode);
    updateAriaLabel(toggle, newMode === "dark");
    currentMode = newMode;
    clearSavedTheme();
  });

  toggle.addEventListener("click", () => {
    const modeToSwitch = currentMode === "dark" ? "light" : "dark";
    updateToggleIcon(iconElem, modeToSwitch);
    updateHTMLTheme(modeToSwitch);
    saveTheme(modeToSwitch);
    updateAriaLabel(toggle, modeToSwitch === "dark");
    currentMode = modeToSwitch;
  });
};

init();
