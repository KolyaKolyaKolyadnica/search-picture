import {
  startInterfaceTheme,
  changeInterfaceTheme,
} from "./js/interfaceTheme.js";
import refs from "./js/refs";
import { startSearching } from "./js/startSearching";
import { startLoadMethod, changeLoadMethod } from "./js/loadMore";
import throttle from "lodash.throttle";
import { getGoUpBtn } from "./js/goUpBtn";

refs.searchForm.addEventListener("submit", startSearching);
refs.optionLoad.addEventListener("click", changeLoadMethod);
refs.themeBtn.addEventListener("click", changeInterfaceTheme);
document.addEventListener("scroll", throttle(getGoUpBtn, 500));

startInterfaceTheme();
startLoadMethod();
