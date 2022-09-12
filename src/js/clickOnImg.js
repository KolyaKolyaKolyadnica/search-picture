import * as basicLightbox from "basiclightbox";
import refs from "./refs";

let instance;

export default function clickOnImg() {
  document.addEventListener("click", showLargeImg);
}
function showLargeImg(e) {
  if (!e.target.dataset.largeImg) {
    return;
  }

  document.removeEventListener("click", showLargeImg);

  instance = basicLightbox.create(`
    <img src="${e.target.dataset.largeImg}">
    `);
  instance.show();

  document.body.classList.add("no-scroll");
  refs.wrapper.classList.add("blur");

  document.addEventListener("keydown", closeLargeImgByKeyboard);
  document.addEventListener("click", closeLargeImgByClick);
}
function closeLargeImgByKeyboard(e) {
  if (e.code !== "Escape" && e.code !== "Tab") {
    return;
  }
  closeLargeImg();
}
function closeLargeImgByClick(e) {
  if (e.target.closest(".basicLightbox__placeholder")) {
    return;
  }
  closeLargeImg();
}
function closeLargeImg() {
  document.removeEventListener("keydown", closeLargeImgByKeyboard);
  document.removeEventListener("click", closeLargeImgByClick);

  document.body.classList.remove("no-scroll");
  refs.wrapper.classList.remove("blur");

  instance.close();
  clickOnImg();
}
