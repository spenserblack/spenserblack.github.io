const dropdown = document.getElementById("theme-dropdown") as HTMLDivElement;
const button = document.getElementById("theme-dropdown-button") as HTMLButtonElement;
const content = document.getElementById("theme-dropdown-content") as HTMLDivElement;


const buttonVariants: [string, HTMLButtonElement][] =  ["system", "dark", "light"]
  .map((variant) => [variant, document.getElementById(`theme-${variant}`) as HTMLButtonElement]);
const themeButtons = buttonVariants.map(([,button]) => button);

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
  const isThemeButton = e.target && themeButtons.includes(e.target as HTMLButtonElement);
  if (!isThemeButton) {
    hide();
  }
});

buttonVariants
.forEach(([variant, button]) => {
  button.addEventListener("mousedown", () => {
    document.documentElement.dataset.theme = variant;
    hide();
  });
});
