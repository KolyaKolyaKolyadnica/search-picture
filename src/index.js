import galleryTpl from "./templates/gallery.hbs";
import * as basicLightbox from "basiclightbox";
import pnotify from "./js/pnotify.js";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "29580630-b4d6d43b83d12c4d9cbbf2fc9";
const PER_PAGE = 12;

let pageNumber;
let requests = [];
let instance;

const refs = {
  wrapper: document.querySelector(".wrapper"),
  optionLoad: document.querySelector(".option-load"),
  searchForm: document.querySelector(".search-form"),
  searchInput: document.querySelector(".search-input"),
  searchBtn: document.querySelector(".search-btn"),
  output: document.querySelector(".content"),
  requests: document.querySelector(".requests"),
  gallery: document.querySelector(".gallery"),
  loadMoreBtn: document.querySelector(".load-more-btn"),
};

refs.searchForm.addEventListener("submit", startSearching);
refs.optionLoad.addEventListener("click", changeLoadMethod);

function changeLoadMethod(e) {
  if (e.currentTarget.dataset.loadMoreImg === "click") {
    e.currentTarget.dataset.loadMoreImg = "scroll";
    e.currentTarget.children[0].textContent = 'I love "Load more" button!';

    if (refs.gallery.children.length > 0) {
      removeLoadMoreBtn();
      getLoadMoreMethod();
    }
  } else {
    e.currentTarget.dataset.loadMoreImg = "click";
    e.currentTarget.children[0].textContent = 'I hate "Load more" button!';

    if (refs.gallery.children.length > 0) {
      getLoadMoreMethod();
    }
  }
}

function startSearching(e) {
  if (refs.searchInput.value === "") {
    return;
  }
  pageNumber = 1;

  removeLoadMoreBtn();
  addRequest();
  getSearchPicture();

  refs.searchInput.value = "";
}
function getSearchPicture() {
  const lastRequest = requests[requests.length - 1];

  fetch(
    `${BASE_URL}?key=${API_KEY}&q=${lastRequest}&image_type=photo&orientation=horizontal&page=${pageNumber}&per_page=${PER_PAGE}&lang=en,ru`
  )
    .then((r) => r.json())
    .then(showFoundPictures);
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
    openLargeImgOnClickSmallImg();
  }

  if (pictures.hits.length < PER_PAGE) {
    removeLoadMoreBtn();

    addNewPictures(pictures);
    openLargeImgOnClickSmallImg();
  }

  if (pictures.hits.length === 0) {
    removeLoadMoreBtn();
  }

  pageNumber += 1;
}

function getLoadMoreMethod() {
  if (refs.optionLoad.dataset.loadMoreImg === "click") {
    showLoadMoreBtn();
  } else {
    const target = refs.gallery.children[refs.gallery.children.length - 1];

    const observer = new IntersectionObserver(
      (entry, observer) => {
        if (entry[0].isIntersecting) {
          observer.unobserve(target);

          getSearchPicture();
        }
      },
      {
        root: null,
        // rootMargin: "30px 0px 0px 0px",
        // threshold: 0.55,
      }
    );

    observer.observe(target);
  }
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.add("active");

  refs.output
    .querySelector(".load-more-btn")
    .addEventListener("click", getSearchPicture);
}
function addNewPictures(pictures) {
  refs.gallery.insertAdjacentHTML("beforeend", galleryTpl(pictures));
  scrollToNewPictures(pictures.hits);
}
function removeLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove("active");
}
function addRequest() {
  requests.push(refs.searchInput.value);
}
function showRequest() {
  refs.requests.insertAdjacentHTML(
    "beforeend",
    `<li>${requests[requests.length - 1]}</li>`
  );
}
function scrollToNewPictures(arr) {
  const firstInNewPictures = document.getElementById(`${String(arr[0].id)}`);

  if (refs.optionLoad.dataset.loadMoreImg === "scroll") {
    return;
  }

  firstInNewPictures.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}

function openLargeImgOnClickSmallImg() {
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
  openLargeImgOnClickSmallImg();
}
