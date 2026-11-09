export const themeInitScript = `
(function () {
  try {
    const savedTheme = localStorage.getItem("theme");

    const theme = savedTheme === "dark" ? "dark" : "light";

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    document.documentElement.style.colorScheme = theme;
  } catch (error) {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
  }
})();
`;