import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

import { error, Stack } from "@pnotify/core";

const myStack = new Stack({
  dir1: "up",
  // maxOpen: 1,
  // firstpos1: 255,
  // spacing1: 125,
  // push: "top",
  modal: true,
  overlayClose: true,

  // dir2: "top",
});

const pnotify = (text) => {
  const options = {
    text,
    styling: "brighttheme",
    icons: "brighttheme",
    animation: "fade",
    animateSpeed: "slow",
    delay: 3000,
    width: "360px",
    minHeight: "36px",
    sticker: false,
    maxTextHeight: null,

    // addClass: ".test",

    type: "error",
    mode: "no-preference",
    // mode: "light",
    // mode: "dark",
    shadow: true, //ne vizhu teni :(
    // mouseReset: false,
    // sticker: true,
    labels: { close: "Close", stick: "Pin", unstick: "Unpin" },

    stack: myStack,
  };
  error(options);
};

export default pnotify;
