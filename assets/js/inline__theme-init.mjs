const THEME_STORAGE_KEY = "theme";
const THEME_EXPIRE_MS = 60 * 60 * 1000; // 1 hour
const THEME_COLORS = {
  dark: "#1b1b1b",
  light: "#ffffff",
};

const isSystemColorSchemeDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getThemeColorMeta = () =>
  document.querySelector('meta[name="theme-color"]');

const getSavedTheme = () => {
  const themeData = localStorage.getItem(THEME_STORAGE_KEY);
  if (!themeData) return null;

  try {
    const parsed = JSON.parse(themeData);
    const now = Date.now();

    if (parsed.timestamp && now - parsed.timestamp < THEME_EXPIRE_MS) {
      return parsed.theme;
    }

    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    localStorage.removeItem(THEME_STORAGE_KEY);
  }

  return null;
};

const applyTheme = (isDark) => {
  const themeColorMeta = getThemeColorMeta();

  if (isDark) {
    document.documentElement.classList.add("dark");
    if (themeColorMeta) {
      themeColorMeta.content = THEME_COLORS.dark;
    }
  } else {
    if (themeColorMeta) {
      themeColorMeta.content = THEME_COLORS.light;
    }
  }
};

const init = () => {
  const savedTheme = getSavedTheme();
  const shouldBeDark = savedTheme
    ? savedTheme === "dark"
    : isSystemColorSchemeDark();
  applyTheme(shouldBeDark);
};

init();
