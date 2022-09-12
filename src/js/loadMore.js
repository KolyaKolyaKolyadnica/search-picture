import refs from "./refs";
import { getSearchPicture } from "./startSearching";

export function changeLoadMethod(e) {
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
export function getLoadMoreMethod() {
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

export function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.add("active");

  refs.output
    .querySelector(".load-more-btn")
    .addEventListener("click", getSearchPicture);
}
export function removeLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove("active");
}
