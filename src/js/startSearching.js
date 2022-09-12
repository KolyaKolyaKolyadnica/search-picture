import refs from "./refs";
import { requests, addRequest, showRequest } from "./request";
import pnotify from "./pnotify.js";
import addNewPictures from "./addNewPictures";
import clickOnImg from "./clickOnImg";
import { getLoadMoreMethod, removeLoadMoreBtn } from "./loadMore";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "29580630-b4d6d43b83d12c4d9cbbf2fc9";
const PER_PAGE = 12;

let pageNumber;

export function startSearching(e) {
  if (refs.searchInput.value === "") {
    return;
  }
  pageNumber = 1;

  removeLoadMoreBtn();
  addRequest();
  getSearchPicture();

  refs.searchInput.value = "";
}
export function getSearchPicture() {
  const lastRequest = requests[requests.length - 1];

  fetch(
    `${BASE_URL}?key=${API_KEY}&q=${lastRequest}&image_type=photo&orientation=horizontal&page=${pageNumber}&per_page=${PER_PAGE}&lang=en,ru`
  )
    .then((r) => r.json())
    .then(showFoundPictures)
    .catch(showError);
}
function showError(error) {
  pnotify(`ERROR! ${error}`);
}
function showFoundPictures(pictures) {
  if (pictures.total === 0) {
    pnotify(
      "Sorry sweetie. Can't find this request. Try typing something else..."
    );

    return;
  }

  if (pictures.hits.length > 0 && pageNumber === 1) {
    showRequest();
    refs.gallery.innerHTML = "";
  }

  if (pictures.hits.length === PER_PAGE) {
    addNewPictures(pictures);

    getLoadMoreMethod(pictures);
    clickOnImg();
  }

  if (pictures.hits.length < PER_PAGE) {
    removeLoadMoreBtn();

    addNewPictures(pictures);
    clickOnImg();
  }

  if (pictures.hits.length === 0) {
    removeLoadMoreBtn();
  }

  pageNumber += 1;
}
