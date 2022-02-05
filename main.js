let map, galleryView;

// Map

function createMap() {
  map = L.map("map", {
    keyboard: false,
  }).setView([55.8725, -4.2778], 13);

  L.tileLayer(
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);
}

// Popups

function configurePopups() {
  galleryView = document.getElementById("gallery_popup");
}

var markerIcon = L.icon({
  iconUrl: "img/window2.png",

  iconSize: [25, 25], // size of the icon
  shadowSize: [35], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-10, -88], // point from which the popup should open relative to the iconAnchor
});

function addMarkers() {
  images.forEach((image) => {
    L.marker(image.location, { icon: markerIcon })
      .bindPopup(
        L.popup({
          className: "markerPopup",
          maxWidth: 300,
        }).setContent(createPopupImageElement(image))
      )
      .addTo(map);
  });
}

function createPopupImageElement(image) {
  var imageHtmlString = `<img
  id="popupImage"
  style="max-width: 200px; max-height: 200px; margin:5px; cursor: pointer; border-radius: 12px;"
  />`;

  var popupImage = createElementFromHTML(imageHtmlString);
  popupImage.src = image.sources[0];
  popupImage.onclick = function () {
    openGalleryView(image);
  };

  return popupImage;
}

// Gallery View

let currentImageNo;
let gallerySrcs;

function openGalleryView(image) {
  gallerySrcs = image.sources;
  document.getElementById("opaque_background").style.visibility = "visible";
  currentImageNo = 1;
  setGalleryImage(image.sources[0]);
  galleryView.style.visibility = "visible";
  document.getElementById("gallery_left_arrow").style.opacity = 0.2;
  document.getElementById("gallery_right_arrow").style.opacity = 1;
  if (gallerySrcs.length === 1) {
    document.getElementById("gallery_left_arrow").style.visibility = "hidden";
    document.getElementById("gallery_right_arrow").style.visibility = "hidden";
  } else {
    document.getElementById("gallery_left_arrow").style.visibility = "visible";
    document.getElementById("gallery_right_arrow").style.visibility = "visible";
  }

  document.getElementById("gallery_back_button").style.visibility = "visible";
  galleryViewOpen = true;
}

function closeGalleryView() {
  galleryView.style.visibility = "hidden";
  document.getElementById("opaque_background").style.visibility = "hidden";
  document.getElementById("gallery_back_button").style.visibility = "hidden";
  document.getElementById("gallery_left_arrow").style.visibility = "hidden";
  document.getElementById("gallery_right_arrow").style.visibility = "hidden";
  setGalleryImage(null);
  galleryViewOpen = false;
}

function moveImageLeft() {
  if (currentImageNo === 1) {
    return;
  }
  currentImageNo--;
  setGalleryImage(gallerySrcs[currentImageNo - 1]);

  document.getElementById("gallery_right_arrow").style.opacity = 1;
  if (currentImageNo === 1) {
    document.getElementById("gallery_left_arrow").style.opacity = 0.2;
  } else {
    document.getElementById("gallery_left_arrow").style.opacity = 1;
  }
}

function moveImageRight() {
  if (currentImageNo == gallerySrcs.length) {
    return;
  }
  currentImageNo++;
  setGalleryImage(gallerySrcs[currentImageNo - 1]);

  document.getElementById("gallery_left_arrow").style.opacity = 1;
  if (currentImageNo == gallerySrcs.length) {
    document.getElementById("gallery_right_arrow").style.opacity = 0.2;
  } else {
    document.getElementById("gallery_right_arrow").style.opacity = 1;
  }
}

function setGalleryImage(src) {
  document.getElementById("gallery_image").src = src;
}

var galleryViewOpen = false;

function startup() {
  createMap();
  configurePopups();
  addMarkers();
  addKeyListeners();
  preloadImages();
}

// Helpers

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}

// Key Listeners

function addKeyListeners() {
  document.addEventListener("keyup", (e) => {
    if (galleryViewOpen) {
      if (e.code === "ArrowLeft") {
        moveImageLeft();
      } else if (e.code === "ArrowRight") {
        moveImageRight();
      } else if (e.code === "Escape") {
        closeGalleryView();
      }
    }
  });
}

// Image Caching

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

// Images

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
  {
    location: [55.8642265, -4.266613],
    title: "200 West Regent Street",
    sources: [
      "img/200_west_regent_1.jpg",
      "img/200_west_regent_2.jpg",
      "img/200_west_regent_3.jpg",
    ],
  },
  {
    location: [55.8679178, -4.2675979],
    title: "Buccleuch Street",
    sources: [
      "img/buc_1.png",
      "img/buc_2.png",
      "img/buc_3.png",
      "img/buc_4.png",
      "img/buc_5.png",
      "img/buc_6.png",
      "img/buc_7.png",
    ],
  },
  {
    location: [46.853868, 29.5798405],
    title: "Tiraspol",
    sources: ["img/t_1.jpg", "img/t_2.jpg", "img/t_3.jpg"],
  },
  {
    location: [55.8785423, -4.2818237, 17],
    title: "Kelvinbridge",
    sources: ["img/kelvinbridge.jpg"],
  },
];
