/** DOM-Referenzen */
const GALLERY_GRID = document.getElementById("gallery-grid");
const LIGHTBOX = document.getElementById("lightbox");
const LIGHTBOX_IMAGE = LIGHTBOX.querySelector(".lightbox__image");
const LIGHTBOX_COUNTER = LIGHTBOX.querySelector(".lightbox__counter");
const LIGHTBOX_TITLE = document.getElementById("lightbox-title");
const LIGHTBOX_CAPTION = document.getElementById("lightbox-caption");

/** Foto-Datensatz – Bilder liegen im Ordner images/ */
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

/** Initialisiert die Galerie */
function init() {
  GALLERY_GRID.innerHTML = renderGallery();
  addGalleryListeners();
  addLightboxListeners();
}

/** Gibt den HTML-String aller Thumbnails zurück */
function renderGallery() {
  return PHOTOS.map((photo, index) => renderThumbnail(photo, index)).join("");
}

/** Gibt den HTML-String eines einzelnen Thumbnails zurück */
function renderThumbnail(photo, index) {
  return `
    <li class="gallery-item">
      <button
        class="gallery-item__button"
        data-index="${index}"
        aria-label="${photo.alt} in Großansicht öffnen"
      >
        <img
          class="gallery-item__image"
          src="${photo.src}"
          alt="${photo.alt}"
          loading="lazy"
        />
      </button>
      <button
        class="gallery-item__favorite icon-btn"
        aria-label="Zu Favoriten hinzufügen"
        aria-pressed="false"
      >
        <svg aria-hidden="true" width="24" height="24" viewBox="24 24 24 24" fill="none">
          <path d="M36 44.675C35.7667 44.675 35.5292 44.6333 35.2875 44.55C35.0458 44.4667 34.8333 44.3333 34.65 44.15L32.925 42.575C31.1583 40.9583 29.5625 39.3542 28.1375 37.7625C26.7125 36.1708 26 34.4167 26 32.5C26 30.9333 26.525 29.625 27.575 28.575C28.625 27.525 29.9333 27 31.5 27C32.3833 27 33.2167 27.1875 34 27.5625C34.7833 27.9375 35.45 28.45 36 29.1C36.55 28.45 37.2167 27.9375 38 27.5625C38.7833 27.1875 39.6167 27 40.5 27C42.0667 27 43.375 27.525 44.425 28.575C45.475 29.625 46 30.9333 46 32.5C46 34.4167 45.2917 36.175 43.875 37.775C42.4583 39.375 40.85 40.9833 39.05 42.6L37.35 44.15C37.1667 44.3333 36.9542 44.4667 36.7125 44.55C36.4708 44.6333 36.2333 44.675 36 44.675ZM35.05 31.1C34.5667 30.4167 34.05 29.8958 33.5 29.5375C32.95 29.1792 32.2833 29 31.5 29C30.5 29 29.6667 29.3333 29 30C28.3333 30.6667 28 31.5 28 32.5C28 33.3667 28.3083 34.2875 28.925 35.2625C29.5417 36.2375 30.2792 37.1833 31.1375 38.1C31.9958 39.0167 32.8792 39.875 33.7875 40.675C34.6958 41.475 35.4333 42.1333 36 42.65C36.5667 42.1333 37.3042 41.475 38.2125 40.675C39.1208 39.875 40.0042 39.0167 40.8625 38.1C41.7208 37.1833 42.4583 36.2375 43.075 35.2625C43.6917 34.2875 44 33.3667 44 32.5C44 31.5 43.6667 30.6667 43 30C42.3333 29.3333 41.5 29 40.5 29C39.7167 29 39.05 29.1792 38.5 29.5375C37.95 29.8958 37.4333 30.4167 36.95 31.1C36.8333 31.2667 36.6917 31.3917 36.525 31.475C36.3583 31.5583 36.1833 31.6 36 31.6C35.8167 31.6 35.6417 31.5583 35.475 31.475C35.3083 31.3917 35.1667 31.2667 35.05 31.1Z" fill="currentColor"/>
        </svg>
      </button>
    </li>
  `;
}

/** Registriert den Click-Listener für die Thumbnail-Galerie */
function addGalleryListeners() {
  GALLERY_GRID.addEventListener("click", handleThumbnailClick);
  GALLERY_GRID.addEventListener("click", handleFavoriteClick);
}

/** Schaltet den Favoritenstatus eines Thumbnails um */
function handleFavoriteClick(event) {
  const btn = event.target.closest(".gallery-item__favorite");
  if (!btn) return;
  const pressed = btn.getAttribute("aria-pressed") === "true";
  btn.setAttribute("aria-pressed", String(!pressed));
  btn.setAttribute("aria-label", !pressed ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen");
}

/** Verarbeitet den Klick auf ein Thumbnail */
function handleThumbnailClick(event) {
  const button = event.target.closest(".gallery-item__button");
  if (!button) return;
  currentIndex = parseInt(button.dataset.index, 10);
  openLightbox(currentIndex);
}

/** Öffnet die Lightbox mit dem Bild am gegebenen Index */
function openLightbox(index) {
  updateLightboxContent(PHOTOS[index]);
  LIGHTBOX.showModal();
}

/** Aktualisiert Bild, Titel, Caption und Counter in der Lightbox */
function updateLightboxContent(photo) {
  LIGHTBOX_IMAGE.src = photo.src;
  LIGHTBOX_IMAGE.alt = photo.alt;
  LIGHTBOX_TITLE.textContent = photo.alt;
  LIGHTBOX_COUNTER.textContent = `${currentIndex + 1}/${PHOTOS.length}`;
  LIGHTBOX_CAPTION.textContent = photo.alt;
}

/** Schließt die Lightbox */
function closeLightbox() {
  LIGHTBOX.close();
}

/** Wechselt zum vorherigen Bild (zyklisch) */
function showPrevious() {
  currentIndex = (currentIndex - 1 + PHOTOS.length) % PHOTOS.length;
  updateLightboxContent(PHOTOS[currentIndex]);
}

/** Wechselt zum nächsten Bild (zyklisch) */
function showNext() {
  currentIndex = (currentIndex + 1) % PHOTOS.length;
  updateLightboxContent(PHOTOS[currentIndex]);
}

/** Registriert alle Lightbox-Event-Listener */
function addLightboxListeners() {
  LIGHTBOX.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
  LIGHTBOX.querySelector(".lightbox__nav--prev").addEventListener("click", showPrevious);
  LIGHTBOX.querySelector(".lightbox__nav--next").addEventListener("click", showNext);
  LIGHTBOX.addEventListener("click", handleBackdropClick);
  document.addEventListener("keydown", handleKeydown);
}

/** Schließt die Lightbox bei Klick auf den Hintergrund */
function handleBackdropClick(event) {
  if (event.target === LIGHTBOX) closeLightbox();
}

/** Navigiert per Pfeiltasten; ESC wird nativ vom <dialog> behandelt */
function handleKeydown(event) {
  if (!LIGHTBOX.open) return;
  if (event.key === "ArrowLeft") showPrevious();
  if (event.key === "ArrowRight") showNext();
}

init();
