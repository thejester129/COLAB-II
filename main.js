let map, galleryView;

// Map

function createMap() {
  map = L.map("map", {
    keyboard: false,
  }).setView([55.87, -4.2778], 14);

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
  shadowSize: [0], // size of the shadow
  iconAnchor: [12.5, 25], // point of the icon which will correspond to marker's location
  shadowAnchor: [0, 0], // the same for the shadow
  popupAnchor: [100, 100], // point from which the popup should open relative to the iconAnchor
});

function addMarkers() {
  images.forEach((image) => {
    var popup = L.popup({
      className: "markerPopup",
      maxWidth: 300,
    });

    var isMobile = false;
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      isMobile = true;
    }

    let marker;
    if (isMobile) {
      marker = L.marker(image.location, { icon: markerIcon })
        .on("touchend", (e) => openPopup(popup, image.location, e))
        .addTo(map);
    } else {
      marker = L.marker(image.location, { icon: markerIcon })
        .on("click", (e) => openPopup(popup, image.location, e))
        .addTo(map);
    }

    popup.setContent(createPopupImageElement(image, marker));
  });
}

function openPopup(popup, location, e) {
  console.log(location);
  location[0] = location[0] + 0.001; // Put above marker
  map.openPopup(popup, location);
}

function createPopupImageElement(image, marker) {
  var imageHtmlString = `<img
  id="popupImage"
  style="max-width: 200px; max-height: 200px; margin:5px; cursor: pointer; border-radius: 12px;"
  />`;

  var popupImage = createElementFromHTML(imageHtmlString);
  popupImage.src = image.sources[0];
  popupImage.onclick = function (event) {
    console.log("clicked");
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
      "img/Kelvingrove_Art_Gallery_2.JPG",
      "img/Kelvingrove_Art_Gallery_3.JPG",
      "img/Kelvingrove_art_Gallery_1.JPG",
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
  {
    location: [55.851608, -4.307512],
    title: "",
    sources: ["img/55.851608, -4.307512.JPG"],
  },
  {
    location: [55.852323, -4.299499],
    title: "",
    sources: ["img/55.852323, -4.299499.JPG"],
  },
  {
    location: [55.855165, -4.236315],
    title: "",
    sources: ["img/55.855165, -4.236315.JPG"],
  },
  {
    location: [55.857368, -4.2482],
    title: "",
    sources: ["img/55.857368, -4.248200.JPG"],
  },
  {
    location: [55.858361, -4.261793],
    title: "",
    sources: ["img/55.858361, -4.261793.JPG"],
  },
  {
    location: [55.863721, -4.261718],
    title: "",
    sources: ["img/55.863721, -4.261718.JPG"],
  },
  {
    location: [55.86401, -4.288351],
    title: "",
    sources: ["img/55.864010, -4.288351.JPG"],
  },
  {
    location: [55.864821, -4.284518],
    title: "",
    sources: ["img/55.864821, -4.284518.JPG"],
  },
  {
    location: [55.864855, -4.258687],
    title: "",
    sources: ["img/55.864855, -4.258687.JPG"],
  },
  {
    location: [55.864915, -4.284782],
    title: "",
    sources: ["img/55.864915, -4.284782.JPG"],
  },
  {
    location: [55.86558, -4.26638],
    title: "",
    sources: ["img/55.865580, -4.266380.JPG"],
  },
  {
    location: [55.865904, -4.261073],
    title: "",
    sources: ["img/55.865904, -4.261073.JPG"],
  },
  {
    location: [55.865984, -4.261777],
    title: "",
    sources: ["img/55.865984, -4.261777.JPG"],
  },
  {
    location: [55.866733, -4.282102],
    title: "",
    sources: ["img/55.866733, -4.282102.JPG"],
  },
  {
    location: [55.866748, -4.282975],
    title: "",
    sources: ["img/55.866748, -4.282975.JPG"],
  },
  {
    location: [55.866908, -4.284327],
    title: "",
    sources: ["img/55.866908, -4.284327.JPG"],
  },
  {
    location: [55.866992, -4.284535],
    title: "",
    sources: ["img/55.866992, -4.284535.JPG"],
  },
  {
    location: [55.86772, -4.26388],
    title: "",
    sources: ["img/55.867720, -4.263880.JPG"],
  },
  {
    location: [55.867837, -4.267048],
    title: "",
    sources: ["img/55.867837, -4.267048.JPG"],
  },
  {
    location: [55.867917, -4.265418],
    title: "",
    sources: ["img/55.867917, -4.265418.JPG"],
  },
  {
    location: [55.868201, -4.26187],
    title: "",
    sources: ["img/55.868201, -4.261870.JPG"],
  },
  {
    location: [55.868363, -4.263689],
    title: "",
    sources: ["img/55.868363, -4.263689.JPG"],
  },
  {
    location: [55.869341, -4.257624],
    title: "",
    sources: ["img/55.869341, -4.257624.JPG"],
  },
  {
    location: [55.873669, -4.276358],
    title: "",
    sources: ["img/55.873669, -4.276358.JPG"],
  },
  {
    location: [55.878645, -4.278485],
    title: "",
    sources: ["img/55.878645, -4.278485.JPG"],
  },
  {
    location: [55.8426191, -4.251966],
    title: "",
    sources: ["img/55.8426191, -4.2519660.JPG"],
  },
  {
    location: [55.8596847, -4.260225],
    title: "",
    sources: ["img/55.8596847, -4.2602250.JPG"],
  },
];
