import refs from "./refs";
import pnotify from "./pnotify.js";

// Simulation of closed access to local storage:
// const localStorage = null;

export function startInterfaceTheme() {
  try {
    if (
      !localStorage.interfaceTheme ||
      localStorage.interfaceTheme === "light"
    ) {
      removeDarkTheme();
    } else {
      addDarkTheme();
    }
  } catch {
    pnotify("WARNING! Problems with access to local storage");
  }
}

export function changeInterfaceTheme() {
  try {
    if (localStorage.interfaceTheme === "dark") {
      localStorage.setItem("interfaceTheme", "light");
      removeDarkTheme();
      switchIcon();
    } else {
      localStorage.setItem("interfaceTheme", "dark");
      addDarkTheme();
    }
  } catch {
    document.body.classList.toggle("dark");
    refs.output.classList.toggle("dark");
    refs.requests.classList.toggle("dark");
    switchIcon();
  }
}
function removeDarkTheme() {
  document.body.classList.remove("dark");
  refs.output.classList.remove("dark");
  refs.requests.classList.remove("dark");
}
function addDarkTheme() {
  document.body.classList.add("dark");
  refs.output.classList.add("dark");
  refs.requests.classList.add("dark");

  switchIcon();
}
function switchIcon() {
  refs.themeIcon.textContent === "bedtime"
    ? (refs.themeIcon.textContent = "wb sunny")
    : (refs.themeIcon.textContent = "bedtime");
}
