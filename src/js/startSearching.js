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
  if (refs.searchInput.value === "" && e.target.localName !== "li") {
    return;
  }
  pageNumber = 1;

  removeLoadMoreBtn();

  if (e.target.localName !== "li") {
    addRequest();
  }
  getSearchPicture(e.target);

  refs.searchInput.value = "";
}
export function getSearchPicture(el) {
  let lastRequest;
  if (!el || el.localName !== "li") {
    lastRequest = requests[requests.length - 1];
  } else {
    lastRequest = el.textContent;
  }
  console.log("afterIF");
  fetch(
    `${BASE_URL}?key=${API_KEY}&q=${lastRequest}&image_type=photo&orientation=horizontal&page=${pageNumber}&per_page=${PER_PAGE}&lang=en,ru`
  )
    .then((r) => r.json())
    .then((r) => {
      showFoundPictures(r, el);
    })
    .catch(showError);
}
function showError(error) {
  pnotify(`ERROR! ${error}`);
}
function showFoundPictures(pictures, el) {
  if (pictures.total === 0) {
    pnotify(
      "Sorry sweetie. Can't find this request. Try typing something else..."
    );

    return;
  }

  if (pictures.hits.length > 0 && pageNumber === 1) {
    if (el.localName !== "li") {
      showRequest();
    }
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
