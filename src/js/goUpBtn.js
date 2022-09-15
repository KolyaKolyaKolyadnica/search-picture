import refs from "./refs";

export function getGoUpBtn() {
  if (window.pageYOffset > 200) {
    refs.goUpBtn.classList.add("active");
  } else {
    refs.goUpBtn.classList.remove("active");
  }
}
