function isMobile() {
  return window.matchMedia("(max-width: 767px)").matches;
}

const menuBtn = document.getElementById("header-menu-btn");
const menu = document.querySelector("nav");

menuBtn.onclick = clickMenu;
if (!isMobile()) {
  menuBtn.onmouseenter = hoverMenu;
  menuBtn.onmouseleave = mouseleaveMenu;
  menu.onmouseenter = hoverMenu;
  menu.onmouseleave = mouseleaveMenu;
}

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
const eventsContainer = document.querySelector(".training-events");
let eventData = [];

function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const slider = document.querySelector(".slider-container");
  elmnt.onmousedown = dragMouseDown;
  setInitialPinPos();

  function setInitialPinPos() {
    let now = new Date();
    let month = now.getMonth();
    let newPos = (slider.offsetWidth / 12) * month;
    elmnt.style.left = newPos + "px";
    getEvents(month);
  }

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
    eventsContainer.innerHTML = "";
    getEvents(rounded);
  }
}

function getEvents(month) {
  fetch(`data/events/${month + 1}.json`)
    .then((response) => response.json())
    .then((data) => {
      let events = [];
      events = JSON.parse(JSON.stringify(data));

      if (events && events.length > 0) {
        events.forEach((item) => {
          let eventItem = document.createElement("div");
          eventItem.classList.add("card", "card-file");

          let title = document.createElement("span");
          title.innerHTML = item.title;
          eventItem.appendChild(title);

          let timeDiv = document.createElement("div");
          timeDiv.classList.add("date-info");
          let date = new Date(item.date);
          timeDiv.innerHTML = `
          <img class="small-icon" src="assets/icons/date-icon.svg" />
          <span class="space-right"> ${date.toLocaleDateString("en-us", {
            weekday: "long",
          })}, ${date.toLocaleDateString("en-us", {
            day: "numeric",
          })} ${date.toLocaleDateString("en-us", { month: "long" })} </span>
          <img class="small-icon" src="assets/icons/clock-icon.svg" />
          <span>${item.time}</span>
          `;
          eventItem.appendChild(timeDiv);

          let elem = document.createElement("div");
          elem.classList.add("card-file-link");
          let icon = document.createElement("img");
          icon.src = "assets/icons/calendar.svg";
          let link = document.createElement("a");
          link.classList.add("link--icon");
          link.innerHTML = `<span>View Event</span>
                    <img src="assets/icons/chevron.svg" alt="" />`;
          elem.append(icon, link);
          eventItem.appendChild(elem);
          eventsContainer.appendChild(eventItem);
        });
      }
    })
    .catch((error) => {
      return [];
    });
}

//
// Newsletter section
//

const newsList = document.querySelector(".newsletter-list");
getNewsletters(newsList);

function getNewsletters(container) {
  fetch("data/newsletters.json")
    .then((response) => response.json())
    .then((data) => {
      let news = [];
      news = JSON.parse(JSON.stringify(data));

      let releaseCount = document.querySelector(
        ".newsletter-download-card .grey-text"
      );
      releaseCount.innerHTML = `${news.length} Releases`;

      news.forEach((n) => {
        let newItem;
        newItem = document.createElement("div");
        newItem.className = "newsletter-item";

        let texts = document.createElement("div");
        let date = document.createElement("div");
        date.className = "newsletter-date";
        date.innerHTML = n.date;
        let title = document.createElement("span");
        title.className = "newsletter-title";
        title.innerHTML = n.title;
        texts.append(date, title);

        let link = document.createElement("a");
        link.className = "link--icon";
        link.href = n.link;
        link.target = "_blank";
        link.innerHTML = `<span>View</span>
                  <img src="assets/icons/chevron.svg" />`;

        newItem.append(texts, link);

        container.appendChild(newItem);
      });
    });
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

const videoFrame = document.getElementById("video-frame");

//
// Populate resource videos
//
const videoList = document.querySelector(".video-list");
getVideos(videoList);

function getVideos(container) {
  fetch("data/resource-videos.json")
    .then((response) => response.json())
    .then((data) => {
      let videos = [];
      videos = JSON.parse(JSON.stringify(data));
      videoFrame.src = videos[0].video_url;

      let first = 1;
      videos.forEach((vid) => {
        let newItem;
        newItem = document.createElement("div");
        newItem.className = "video-list-item";
        if (first) {
          newItem.classList.add("active");
          first = 0;
        }
        newItem.dataset.videourl = vid["video_url"];
        let thumbnail = document.createElement("img");
        thumbnail.src = vid["thumbnail"];
        let title = document.createElement("span");
        title.innerHTML = vid.title;
        newItem.append(thumbnail, title);

        newItem.onclick = selectVideo;
        container.appendChild(newItem);
      });
    });
}

function selectVideo(e) {
  console.log("select");
  if (!e.currentTarget.classList.contains("active")) {
    let currentActive = document.querySelector(".video-list-item.active");
    currentActive ? currentActive.classList.remove("active") : null;
    e.currentTarget.classList.add("active");
    // update video player
    videoFrame.src = e.currentTarget.dataset.videourl;
  }
}
