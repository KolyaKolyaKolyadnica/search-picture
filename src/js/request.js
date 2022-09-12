import refs from "./refs";

export let requests = [];
export function addRequest() {
  requests.push(refs.searchInput.value);
}
export function showRequest() {
  refs.requests.insertAdjacentHTML(
    "beforeend",
    `<li>${requests[requests.length - 1]}</li>`
  );
}
