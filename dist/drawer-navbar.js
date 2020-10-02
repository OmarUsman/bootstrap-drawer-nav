var body = document.body;
var navbar = document.querySelector(".navbar");
var navbarCollapse = document.querySelector("#navbar");

body.insertAdjacentHTML("afterbegin", "<div class=\"side-menu-overlay\"></div>");
var overlay = document.querySelector(".side-menu-overlay");

body.insertAdjacentHTML("afterbegin", "<div id=\"side-menu\"></div>");
var sideMenu = document.querySelector("#side-menu");

sideMenu.insertAdjacentHTML("afterbegin", "<button class=\"close btn\"><span aria-hidden=\"true\"><i data-feather=\"x\"></i></span></button>");
var sideMenuCloseBtn = document.querySelector(".close");

sideMenu.insertAdjacentHTML("beforeend", "<div class=\"contents\"></div>");
var sideMenuContents = document.querySelector(".contents");

navbarCollapse.addEventListener("show.bs.collapse", function (e) {
  e.preventDefault();
  var menuContent = this.innerHTML;
  sideMenuContents.innerHTML = menuContent;
  slideIn();
});

window.onresize = function () {
  if (!navbarCollapse.style.display == (":visible") && body.classList.contains("side-menu-visible")) {
    sideMenu.style.display = "block";
    overlay.style.display = "block";
  } else {
    sideMenu.style.display = "none";
    overlay.style.display = "none";
  }
};

sideMenuCloseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  slideOut();
});

overlay.addEventListener("click", function (e) {
  slideOut();
});

function slideIn() {
  body.classList.add("overflow-hidden");
  sideMenu.style.display = "block";
  setTimeout(function () {
    body.classList.add("side-menu-visible");
    fadeIn(overlay);
  }, 50);
}

function slideOut() {
  body.classList.remove("side-menu-visible");
  fadeOut(overlay);
  setTimeout(function () {
    sideMenu.style.display = "none";
    body.classList.remove("overflow-hidden");
  }, 400);
}

function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
};