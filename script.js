const menuBtn = document.getElementById("header-menu-btn");
const menu = document.querySelector("nav");

menuBtn.onmouseenter = hoverMenu;
menuBtn.onmouseleave = mouseleaveMenu;
menuBtn.onclick = clickMenu;
menu.onmouseenter = hoverMenu;
menu.onmouseleave = mouseleaveMenu;

function hideMenu() {
  menu.className = "hide";
}
function hoverMenu() {
  menu.classList.remove("hide");
}
function mouseleaveMenu() {
  if (!menu.classList.contains("clicked")) {
    hideMenu();
  }
}
function clickMenu() {
  if (menu.classList.contains("hide")) {
    menu.className = "clicked";
  } else {
    hideMenu();
  }
}

// video mute button
const muteBtn = document.getElementById("mute-btn");
const muteIcon = document.getElementById("mute-icon");
const vid = document.getElementById("heroVideo");
muteBtn.onclick = toggleMute;
function toggleMute() {
  vid.muted = !vid.muted;
  if (vid.muted) {
    muteIcon.src = "assets/icons/audio-mute.svg";
  } else {
    muteIcon.src = "assets/icons/audio-on.svg";
  }
}

//
// Training section
//

// Make the DIV element draggable:
dragElement(document.getElementById("date-pin"));

function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const slider = document.querySelector(".slider-container");
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    if (
      elmnt.offsetLeft - pos1 >= 0 &&
      elmnt.offsetLeft - pos1 < slider.offsetWidth - elmnt.offsetWidth
    ) {
      let newPos = elmnt.offsetLeft - pos1;
      elmnt.style.left = newPos + "px";
    }
  }

  function closeDragElement() {
    // snap pin
    let rounded = Math.round(elmnt.offsetLeft / (slider.offsetWidth / 12));
    let newPos = (slider.offsetWidth / 12) * rounded;
    elmnt.style.left = newPos + "px";

    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;

    // fetch current month's events
  }
}

//
// Resources section
//

const docBtn = document.getElementById("res-doc-btn");
const vidBtn = document.getElementById("res-vid-btn");
docBtn.onclick = resourceTabClick;
vidBtn.onclick = resourceTabClick;
const docTab = document.querySelector(".resource-docs");
const vidTab = document.querySelector(".resource-videos");

function resourceTabClick(e) {
  if (e.target == vidBtn && !vidBtn.classList.contains("active")) {
    vidBtn.classList.add("active");
    docBtn.classList.remove("active");
    docTab.classList.add("hide");
    vidTab.classList.remove("hide");
  } else if (e.target == docBtn && !docBtn.classList.contains("active")) {
    vidBtn.classList.remove("active");
    docBtn.classList.add("active");
    docTab.classList.remove("hide");
    vidTab.classList.add("hide");
  }
}
