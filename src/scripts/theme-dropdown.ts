const dropdown = document.getElementById("theme-dropdown") as HTMLDivElement;
const button = document.getElementById(
  "theme-dropdown-button",
) as HTMLButtonElement;
const content = document.getElementById(
  "theme-dropdown-content",
) as HTMLDivElement;

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

const show = () => {
  content.classList.remove("hide");
  content.classList.add("show");
};

const hide = () => {
  content.classList.remove("show");
  content.classList.add("hide");
};

const toggle = () => {
  if (content.classList.contains("show")) {
    hide();
  } else {
    show();
  }
};

button.addEventListener("click", toggle);
button.addEventListener("blur", (e) => {
  const isThemeButton =
    e.target && themeButtons.includes(e.target as HTMLButtonElement);
  if (!isThemeButton) {
    hide();
  }
});

buttonVariants.forEach(([variant, button]) => {
  button.addEventListener("mousedown", () => {
    setTheme(variant);
    saveTheme(variant);
    hide();
  });
});
