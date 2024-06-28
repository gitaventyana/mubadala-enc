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
