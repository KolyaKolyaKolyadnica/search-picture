import {
  startInterfaceTheme,
  changeInterfaceTheme,
} from "./js/interfaceTheme.js";
import refs from "./js/refs";
import { startSearching } from "./js/startSearching";
import { changeLoadMethod } from "./js/loadMore";
import { getGoUpBtn } from "./js/goUpBtn";

refs.searchForm.addEventListener("submit", startSearching);
refs.optionLoad.addEventListener("click", changeLoadMethod);
refs.themeBtn.addEventListener("click", changeInterfaceTheme);

startInterfaceTheme();

document.addEventListener("scroll", getGoUpBtn);
