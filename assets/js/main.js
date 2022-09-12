console.log("Start JS");

import Router from './router.js';

const btnOpenMenu = document.getElementById('btn-open');
const btnCloseMenu = document.querySelector('.menu-mobile .close');
const router = new Router();

router.add("/", "../../pages/home.html");
router.add("/universe", "../../pages/universe.html");
router.add("/explorer", "../../pages/explorer.html");
router.add(404, "../../pages/not-found.html");

router.handleView();

window.addEventListener("popstate", router.handleView);
window.router = () => router.router();

btnOpenMenu.addEventListener("click", router.handleMobileMenu);
btnCloseMenu.addEventListener("click", router.handleMobileMenu);
