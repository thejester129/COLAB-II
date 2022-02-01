let map, galleryView;

const images = [
  {
    location: [55.8908151, -4.2313973],
    title: "Springburn",
    sources: [
      "img/springburn_1.JPG",
      "img/springburn_2.JPG",
      "img/springburn_3.JPG",
    ],
  },
  {
    location: [55.86784, -4.265451],
    title: "89 Buccleuch Street",
    sources: [
      "img/89_Buccleuch_Street_1.JPG",
      "img/89_Buccleuch_Street_2.JPG",
      "img/89_Buccleuch_Street_3.JPG",
    ],
  },
  {
    location: [55.865595, -4.265132],
    title: "CCA Sauchiehall Street",
    sources: ["img/CCA_Sauchiehall_Street.JPG"],
  },
  {
    location: [55.863692, -4.282373],
    title: "Finnieston",
    sources: ["img/Finnieston.JPG"],
  },
  {
    location: [55.865936, -4.264532],
    title: "Campus",
    sources: ["img/Campus.JPG"],
  },
  {
    location: [55.868779, -4.290083],
    title: "Kelvingrove Art Gallery",
    sources: [
      "img/Kelvingrove_art_Gallery_1.JPG",
      "img/Kelvingrove_Art_Gallery_2.JPG",
      "img/Kelvingrove_Art_Gallery_3.JPG",
    ],
  },
  {
    location: [55.896216, -4.343972],
    title: "Great Western Road",
    sources: ["img/Great_Western_Road.JPG"],
  },
  {
    location: [55.865932, -4.288073],
    title: "Argyle Street",
    sources: ["img/Argyle_Street_1.JPG", "img/Argyle_Street_2.JPG"],
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

var galleryViewOpen = false;

function openGalleryView(image) {
  gallerySrcs = image.sources;
  setCurrentProgress(1);
  currentImageNo = 1;
  setGalleryImage(image.sources[0]);
  document.getElementById("gallery_image_title").innerText = image.title;
  galleryView.style.visibility = "visible";
  document.getElementById("map").style.visibility = "hidden";

  if (gallerySrcs.length === 1) {
    document.getElementById("arrow_left").style.visibility = "hidden";
    document.getElementById("arrow_right").style.visibility = "hidden";
  } else {
    document.getElementById("arrow_left").style.visibility = "visible";
    document.getElementById("arrow_right").style.visibility = "visible";
  }
  galleryViewOpen = true;
}

function closeGalleryView() {
  galleryView.style.visibility = "hidden";
  document.getElementById("map").style.visibility = "visible";
  setGalleryImage(null);
  galleryViewOpen = false;
}

var cachedImages = [];

function preloadImage(url) {
  var img = new Image();
  img.src = url;
  cachedImages.push(img);
}

function preloadImages() {
  cachedImages = new Array(images.length);
  images.forEach((image) => {
    image.sources.forEach((src) => {
      preloadImage(src);
    });
  });
}

function addKeyListeners() {
  document.addEventListener("keyup", (e) => {
    if (galleryViewOpen) {
      if (e.code === "ArrowLeft") {
        moveImageLeft();
      } else if (e.code === "ArrowRight") {
        moveImageRight();
      }
    }
  });
}

function startup() {
  createMap();
  configurePopups();
  addMarkers();
  addKeyListeners();
  preloadImages();
}
