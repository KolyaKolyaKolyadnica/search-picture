import refs from "./refs";
import pnotify from "./pnotify.js";
import { getSearchPicture } from "./startSearching";

export function startLoadMethod() {
  try {
    if (!localStorage.loadMethod || localStorage.loadMethod === "click") {
      refs.optionLoad.dataset.loadMoreImg = "scroll";
      refs.optionLoad.children[1].textContent = 'I love "Load more" button!';
    } else {
      refs.optionLoad.dataset.loadMoreImg = "click";
      refs.optionLoad.children[1].textContent = 'I hate "Load more" button!';
    }
  } catch {
    pnotify("WARNING! Problems with access to local storage");
  }
}

export function changeLoadMethod(e) {
  if (e.target.localName !== "input") {
    return;
  }

  if (e.currentTarget.dataset.loadMoreImg === "click") {
    e.currentTarget.dataset.loadMoreImg = "scroll";
    e.currentTarget.children[1].textContent = 'I love "Load more" button!';
    localStorage.setItem("loadMoreImg", "scroll");

    if (refs.gallery.children.length > 0) {
      removeLoadMoreBtn();
      getLoadMoreMethod();
    }
  } else {
    e.currentTarget.dataset.loadMoreImg = "click";
    e.currentTarget.children[1].textContent = 'I hate "Load more" button!';
    localStorage.setItem("loadMoreImg", "click");

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
  refs.loadMoreBtn.addEventListener("click", getSearchPicture);
}
export function removeLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove("active");
}
