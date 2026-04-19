/** DOM references */
const GALLERY_GRID = document.getElementById("gallery-grid");
const LIGHTBOX = document.getElementById("lightbox");
const LIGHTBOX_IMAGE = LIGHTBOX.querySelector(".lightbox__image");
const LIGHTBOX_COUNTER = LIGHTBOX.querySelector(".lightbox__counter");
const LIGHTBOX_TITLE = document.getElementById("lightbox-title");
const LIGHTBOX_CAPTION = document.getElementById("lightbox-caption");

/** Photo data – images are located in the images/ folder */
const PHOTOS = [
  { id: 1,  src: "images/alaska-810433_1280.jpg",          alt: "Verschneite Landschaft in Alaska" },
  { id: 2,  src: "images/anime-8788959_1280.jpg",           alt: "Anime-Illustration einer Figur" },
  { id: 3,  src: "images/atmosphere-8752835_1280.jpg",      alt: "Atmosphärische Stimmungsaufnahme" },
  { id: 4,  src: "images/blue-tit-8521052_1280.jpg",        alt: "Blaumeise auf einem Ast" },
  { id: 5,  src: "images/hurricane-92968_1280.jpg",         alt: "Hurrikan aus der Vogelperspektive" },
  { id: 6,  src: "images/lake-2896379_1280.jpg",            alt: "Ruhiger See in der Natur" },
  { id: 7,  src: "images/moorente-8783210_1280.jpg",        alt: "Moorente auf dem Wasser" },
  { id: 8,  src: "images/sea-2563389_1280.jpg",             alt: "Meeresküste mit Wellen" },
  { id: 9,  src: "images/snow-bunting-6781122_1280.jpg",    alt: "Schneeammer auf einem Zweig" },
  { id: 10, src: "images/snow-leopard-cubs-8039138_1280.jpg", alt: "Schneeleoparden-Jungtiere" },
  { id: 11, src: "images/travel-8785493_1280.jpg",          alt: "Reisefotografie unterwegs" },
  { id: 12, src: "images/winter-1675197_1280.jpg",          alt: "Winterlandschaft mit Schnee" },
];

let currentIndex = 0;

/** Initializes the gallery */
function init() {
  GALLERY_GRID.innerHTML = renderGallery();
  addGalleryListeners();
  addLightboxListeners();
}

/** Returns the HTML string of all thumbnails */
function renderGallery() {
  return PHOTOS.map((photo, index) => renderThumbnail(photo, index)).join("");
}


/** Registers click listeners for the thumbnail gallery */
function addGalleryListeners() {
  GALLERY_GRID.addEventListener("click", handleThumbnailClick);
  GALLERY_GRID.addEventListener("click", handleFavoriteClick);
}

/** Toggles the favorite status of a thumbnail */
function handleFavoriteClick(event) {
  const btn = event.target.closest(".gallery-item__favorite");
  if (!btn) return;
  const pressed = btn.getAttribute("aria-pressed") === "true";
  btn.setAttribute("aria-pressed", String(!pressed));
  btn.setAttribute("aria-label", !pressed ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen");
}

/** Handles a click on a thumbnail */
function handleThumbnailClick(event) {
  const button = event.target.closest(".gallery-item__button");
  if (!button) return;
  currentIndex = parseInt(button.dataset.index, 10);
  openLightbox(currentIndex);
}

/** Opens the lightbox with the image at the given index */
function openLightbox(index) {
  updateLightboxContent(PHOTOS[index]);
  LIGHTBOX.showModal();
}

/** Updates image, title and counter in the lightbox */
function updateLightboxContent(photo) {
  LIGHTBOX_IMAGE.src = photo.src;
  LIGHTBOX_IMAGE.alt = photo.alt;
  LIGHTBOX_TITLE.textContent = photo.alt;
  LIGHTBOX_COUNTER.textContent = `${currentIndex + 1}/${PHOTOS.length}`;
  LIGHTBOX_CAPTION.textContent = photo.alt;
}

/** Closes the lightbox */
function closeLightbox() {
  LIGHTBOX.close();
}

/** Shows the previous image (cyclic) */
function showPrevious() {
  currentIndex = (currentIndex - 1 + PHOTOS.length) % PHOTOS.length;
  updateLightboxContent(PHOTOS[currentIndex]);
}

/** Shows the next image (cyclic) */
function showNext() {
  currentIndex = (currentIndex + 1) % PHOTOS.length;
  updateLightboxContent(PHOTOS[currentIndex]);
}

/** Registers all lightbox event listeners */
function addLightboxListeners() {
  LIGHTBOX.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
  LIGHTBOX.querySelector(".lightbox__nav--prev").addEventListener("click", showPrevious);
  LIGHTBOX.querySelector(".lightbox__nav--next").addEventListener("click", showNext);
  LIGHTBOX.addEventListener("click", handleBackdropClick);
  document.addEventListener("keydown", handleKeydown);
}

/** Closes the lightbox when clicking the backdrop */
function handleBackdropClick(event) {
  if (event.target === LIGHTBOX) closeLightbox();
}

/** Navigates with arrow keys; ESC is handled natively by <dialog> */
function handleKeydown(event) {
  if (!LIGHTBOX.open) return;
  if (event.key === "ArrowLeft") showPrevious();
  if (event.key === "ArrowRight") showNext();
}

init();
