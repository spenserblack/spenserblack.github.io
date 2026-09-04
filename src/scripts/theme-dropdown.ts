const themeKey = "spenserblack.github.io theme";

const setTheme = (theme: string) => {
  document.documentElement.dataset.theme = theme;
};
const saveTheme = (theme: string) => {
  localStorage.setItem(themeKey, theme);
};
const loadTheme = (): string | null => localStorage.getItem(themeKey);

// NOTE Set theme for initial load.
const savedTheme = loadTheme();
if (savedTheme !== null) {
  setTheme(savedTheme);
}

const buttonVariants: [string, HTMLButtonElement][] = [
  "system",
  "dark",
  "light",
].map((variant) => [
  variant,
  document.getElementById(`theme-${variant}`) as HTMLButtonElement,
]);
const themeButtons = buttonVariants.map(([, button]) => button);

buttonVariants.forEach(([variant, button]) => {
  button.addEventListener("mousedown", () => {
    setTheme(variant);
    saveTheme(variant);
  });
});
