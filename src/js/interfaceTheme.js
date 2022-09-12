import refs from "./refs";

export function startInterfaceTheme() {
  if (!localStorage.interfaceTheme || localStorage.interfaceTheme === "light") {
    removeDarkTheme();
  } else {
    addDarkTheme();
  }
}

export function changeInterfaceTheme() {
  if (localStorage.interfaceTheme === "dark") {
    localStorage.setItem("interfaceTheme", "light");
    removeDarkTheme();
  } else {
    localStorage.setItem("interfaceTheme", "dark");
    addDarkTheme();
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
}
