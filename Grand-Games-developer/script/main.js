"use strict";

import { createElements } from "./gameCards.js";


createElements();

window.onscroll = function (e) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
        createElements();
};
