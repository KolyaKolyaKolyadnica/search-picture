import refs from "./refs";
import galleryTpl from "../templates/gallery.hbs";

function addNewPictures(pictures) {
  refs.gallery.insertAdjacentHTML("beforeend", galleryTpl(pictures));
  scrollToNewPictures(pictures.hits);
}
function scrollToNewPictures(arr) {
  if (refs.optionLoad.dataset.loadMoreImg === "scroll") {
    return;
  }

  const firstInNewPictures = document.getElementById(`${String(arr[0].id)}`);

  firstInNewPictures.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}
export default addNewPictures;
