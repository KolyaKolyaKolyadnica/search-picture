import {
  startInterfaceTheme,
  changeInterfaceTheme,
} from "./js/interfaceTheme.js";
import refs from "./js/refs";
import { startSearching } from "./js/startSearching";
import { changeLoadMethod } from "./js/loadMore";

refs.searchForm.addEventListener("submit", startSearching);
refs.optionLoad.addEventListener("click", changeLoadMethod);
refs.themeBtn.addEventListener("click", changeInterfaceTheme);

startInterfaceTheme();

// console.log(refs.optionLoad);

// console.log(refs.optionLoad);
