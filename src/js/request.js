import refs from "./refs";
import { startSearching } from "./startSearching";

export let requests = [];

export function addRequest() {
  requests.push(refs.searchInput.value);
}
export function showRequest() {
  refs.requests.insertAdjacentHTML(
    "beforeend",
    `<li>${requests[requests.length - 1]}</li>`
  );

  refs.requests.children[refs.requests.children.length - 1].addEventListener(
    "click",
    startSearching
  );
}
