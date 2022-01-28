let map, galleryView;

const images = [
  // Andrew
  {
    location: [55.8908151, -4.2313973],
    title: "Springburn",
    sources: ["img/andrew1.jpg", "img/andrew2.jpg", "img/andrew3.jpg"],
  },
];

function createMap() {
  map = L.map("map").setView([55.8725, -4.2778], 13);

  L.tileLayer(
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);
}

function configurePopups() {
  galleryView = document.getElementById("gallery_popup");
}

function addMarkers() {
  images.forEach((image) => {
    L.marker(image.location)
      .addTo(map)
      .on("click", () => openGalleryView(image));
  });
}

let currentImageNo;
let gallerySrcs;

function moveImageRight() {
  if (currentImageNo == gallerySrcs.length) {
    return;
  }
  currentImageNo++;
  setGalleryImage(gallerySrcs[currentImageNo - 1]);
  setCurrentProgress(currentImageNo);
}

function moveImageLeft() {
  if (currentImageNo == 1) {
    return;
  }
  currentImageNo--;
  setGalleryImage(gallerySrcs[currentImageNo - 1]);
  setCurrentProgress(currentImageNo);
}

function setGalleryImage(src) {
  document.getElementById("gallery_image").src = src;
}

function setCurrentProgress(x) {
  document.getElementById("gallery_image_progress").innerText =
    x + "/" + gallerySrcs.length;
}

function openGalleryView(image) {
  gallerySrcs = image.sources;
  setCurrentProgress(1);
  currentImageNo = 1;
  setGalleryImage(image.sources[0]);
  document.getElementById("gallery_image_title").innerText = image.title;
  galleryView.style.visibility = "visible";
  document.getElementById("map").style.visibility = "hidden";
}

function closeGalleryView() {
  galleryView.style.visibility = "hidden";
  document.getElementById("map").style.visibility = "visible";
}

function startup() {
  createMap();
  configurePopups();
  addMarkers();
}
