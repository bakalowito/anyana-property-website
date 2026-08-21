/* ===== IMAGE LIGHTBOX (amenities) ===== */
(() => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  if (!lightbox || !lightboxImage) return;

  const openLightbox = (src, caption) => {
    lightboxImage.src = src;
    lightboxImage.alt = caption || "Enlarged photo";
    lightboxCaption.textContent = caption || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("tour-modal-locked");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("tour-modal-locked");
    lightboxImage.src = "";
  };

  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", () => openLightbox(el.dataset.lightbox, el.dataset.lightboxCaption));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(el.dataset.lightbox, el.dataset.lightboxCaption);
      }
    });
  });

  document.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });
})();

/* ===== STICKY NAVBAR ON SCROLL ===== */
(() => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  const setState = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
  setState();
  window.addEventListener("scroll", setState, { passive: true });
})();

/* ===== SCROLL-REVEAL ANIMATIONS ===== */
(() => {
  const targets = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
})();

const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("mobile-open");
    menu.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("mobile-open");
      menu.setAttribute("aria-expanded", "false");
    });
  });
}

/* ===== 360 VIRTUAL TOUR MODAL ===== */
(() => {
  const TOUR_URL = "https://anyana.com.ph/virtual-tour/tour.html?startscene=3";
  const modal = document.getElementById("tourModal");
  const iframe = document.getElementById("tourIframe");
  if (!modal || !iframe) return;

  const openTour = (e) => {
    if (e) e.preventDefault();
    iframe.src = TOUR_URL;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("tour-modal-locked");
  };

  const closeTour = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("tour-modal-locked");
    iframe.src = ""; // stop the tour from playing/loading in the background
  };

  document.querySelectorAll("[data-tour-open]").forEach((el) => {
    el.addEventListener("click", openTour);
  });

  document.querySelectorAll("[data-tour-close]").forEach((el) => {
    el.addEventListener("click", closeTour);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeTour();
  });
})();

const properties = {
  sydney: {
  lotArea: "80 sqm",
  floorArea: "76 sqm",    label: "SYDNEY",
    title: "Sydney Model",
    folder: "sydney",
    imageCount: 6,
    bedrooms: "3 Bedrooms",
    bathrooms: "2 Toilet & Bath",
    garage: "1-Car Garage",
    price: "Starting at ₱6 Million",
    description: "The Sydney Model offers a comfortable and practical home layout designed for modern families, with essential spaces for everyday living and a convenient one-car garage.",
    specSheet: "documents/sydney-spec-sheet.pdf"
  },
  tokyo: {
  lotArea: "100 sqm",
  floorArea: "107.35 sqm",    label: "TOKYO",
    title: "Tokyo Model",
    folder: "tokyo",
    imageCount: 9,
    bedrooms: "4 Bedrooms",
    bathrooms: "2 Toilet & Bath",
    garage: "1-Car Garage",
    price: "TCP from ₱8.7 Million",
    description: "The Tokyo Model combines a spacious family layout with practical living areas, giving homeowners more flexibility for everyday comfort and future needs.",
    specSheet: "documents/tokyo-spec-sheet.pdf"
  },
  newyork: {
  lotArea: "125 sqm",
  floorArea: "130.35 sqm",    label: "NEW YORK",
    title: "New York Model",
    folder: "newyork",
    imageCount: 4,
    bedrooms: "4 Bedrooms",
    bathrooms: "3 Bathrooms",
    garage: "1-Car Garage",
    price: "TCP from ₱10.8 Million*",
    description: "The New York Model is designed for larger families who want additional bedrooms, bathrooms, and more generous living space within a premium community.",
    specSheet: "documents/newyork-spec-sheet.pdf"
  },
  paris: {
 lotArea: "150 sqm",
  floorArea: "187.32 sqm",
    label: "PARIS",
    title: "Paris Model",
    folder: "paris",
    imageCount: 6,
    bedrooms: "4 Bedrooms",
    bathrooms: "3 Bathrooms",
    garage: "2-Car Garage",
    price: "TCP from ₱16 Million*",
    description: "The Paris Model offers a larger family-oriented layout with generous living space and a premium residential setting for homeowners looking for more room.",
    specSheet: "documents/paris-spec-sheet.pdf"
  }
};

const details = document.getElementById("propertyDetails");
const detailsLabel = document.getElementById("detailsModelLabel");
const detailsTitle = document.getElementById("detailsTitle");
const detailsDescription = document.getElementById("detailsDescription");
const detailsLotArea = document.getElementById("detailsLotArea");
const detailsFloorArea = document.getElementById("detailsFloorArea");

const detailsBedrooms = document.getElementById("detailsBedrooms");
const detailsBathrooms = document.getElementById("detailsBathrooms");
const detailsGarage = document.getElementById("detailsGarage");
const detailsModel = document.getElementById("detailsModel");
const detailsBedroomsTable = document.getElementById("detailsBedroomsTable");
const detailsBathroomsTable = document.getElementById("detailsBathroomsTable");
const detailsGarageTable = document.getElementById("detailsGarageTable");
const detailsPrice = document.getElementById("detailsPrice");
const closeDetails = document.getElementById("closeDetails");
const detailsInquiry = document.getElementById("detailsInquiry");
const detailsDownload = document.getElementById("detailsDownload");

// =========================================================
// CAROUSEL
// =========================================================
const carouselTrack = document.getElementById("detailsCarouselTrack");
const carouselDots = document.getElementById("carouselDots");
const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");

let currentImages = [];
let currentSlide = 0;

function updateCarouselUI() {
  if (!carouselTrack) return;
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  if (carouselDots) {
    carouselDots.querySelectorAll("button").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }
}

function showSlide(index) {
  if (!currentImages.length) return;
  currentSlide = (index + currentImages.length) % currentImages.length;
  updateCarouselUI();
}

function buildCarousel(folder, count, title) {
  if (!carouselTrack || !carouselDots) return;
  currentImages = Array.from({ length: count }, (_, i) => `images/${folder}/${i + 1}.jpg`);
  currentSlide = 0;

  carouselTrack.innerHTML = currentImages
    .map((src, i) => `<img src="${src}" alt="${title} photo ${i + 1}" loading="${i === 0 ? "eager" : "lazy"}">`)
    .join("");

  carouselDots.innerHTML = currentImages.length > 1
    ? currentImages
        .map((_, i) => `<button type="button" data-slide="${i}" aria-label="Go to photo ${i + 1}"></button>`)
        .join("")
    : "";

  updateCarouselUI();
}

if (carouselPrev) carouselPrev.addEventListener("click", () => showSlide(currentSlide - 1));
if (carouselNext) carouselNext.addEventListener("click", () => showSlide(currentSlide + 1));
if (carouselDots) {
  carouselDots.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-slide]");
    if (btn) showSlide(Number(btn.dataset.slide));
  });
}

// Swipe support for touch devices
let touchStartX = 0;
let touchDeltaX = 0;
if (carouselTrack) {
  carouselTrack.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
  }, { passive: true });

  carouselTrack.addEventListener("touchmove", (e) => {
    touchDeltaX = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  carouselTrack.addEventListener("touchend", () => {
    if (Math.abs(touchDeltaX) > 40) {
      showSlide(touchDeltaX > 0 ? currentSlide - 1 : currentSlide + 1);
    }
  });
}

function showProperty(modelKey) {
  const property = properties[modelKey];
  if (!property || !details) return;

  buildCarousel(property.folder, property.imageCount, property.title);

  detailsLabel.textContent = property.label;
  detailsTitle.textContent = property.title;
  detailsDescription.textContent = property.description;
  detailsLotArea.textContent = property.lotArea || "—";
const lotAreaTable = document.getElementById("detailsLotAreaTable");
const floorAreaTable = document.getElementById("detailsFloorAreaTable");
if (lotAreaTable) lotAreaTable.textContent = property.lotArea || "—";
if (floorAreaTable) floorAreaTable.textContent = property.floorArea || "—";
detailsFloorArea.textContent = property.floorArea || "—";
detailsBedrooms.textContent = property.bedrooms;
  detailsBathrooms.textContent = property.bathrooms;
  detailsGarage.textContent = property.garage;
  detailsModel.textContent = property.label;
  detailsBedroomsTable.textContent = property.bedrooms;
  detailsBathroomsTable.textContent = property.bathrooms;
  detailsGarageTable.textContent = property.garage;
  detailsPrice.textContent = property.price;

  detailsInquiry.dataset.model = property.title;
  detailsInquiry.href = "#contact";

  if (detailsDownload && property.specSheet) {
    detailsDownload.href = property.specSheet;
    detailsDownload.setAttribute("download", `Anyana-${property.title.replace(/\s+/g, "-")}-Spec-Sheet.pdf`);
  }

  details.classList.add("active");
  details.setAttribute("aria-hidden", "false");

  requestAnimationFrame(() => {
    details.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

document.querySelectorAll(".property-view-btn").forEach((button) => {
  button.addEventListener("click", () => showProperty(button.dataset.model));
});

function hideProperty() {
  if (!details) return;
  details.classList.remove("active");
  details.setAttribute("aria-hidden", "true");
}

if (closeDetails) {
  closeDetails.addEventListener("click", () => {
    hideProperty();
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");
const submitButton = document.getElementById("submitInquiry");
const interestSelect = document.getElementById("interest");

// =========================================================
// EMAILJS CONFIGURATION
// Replace these 3 values with the values from your EmailJS dashboard.
// IMPORTANT: Do not put your Gmail password here.
// =========================================================
const EMAILJS_PUBLIC_KEY = "mq67QpsOLkrlWT7y5";
const EMAILJS_SERVICE_ID = "service_u74s757";
const EMAILJS_TEMPLATE_ID = "template_t630y19";

if (typeof emailjs !== "undefined") {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}

// When a client clicks "Inquire About This Model", pre-select that model.
if (detailsInquiry && interestSelect) {
  detailsInquiry.addEventListener("click", () => {
    const model = detailsInquiry.dataset.model;
    if (model) {
      const option = Array.from(interestSelect.options).find(
        (opt) => opt.textContent.trim() === model.trim()
      );
      if (option) interestSelect.value = option.value;
    }
  });
}

if (form && message) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const interest = document.getElementById("interest").value;
    const userMessage = document.getElementById("message").value.trim();

    if (!name || !phone || !interest) {
      message.textContent = "Please complete the required fields.";
      message.style.color = "#9da2ff";
      return;
    }

    if (typeof emailjs === "undefined") {
      message.textContent = "Email service is unavailable. Please try again later.";
      message.style.color = "#ff8f8f";
      return;
    }

    if (
      EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY" ||
      EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
      EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID"
    ) {
      message.textContent = "Email service is not configured yet. Please contact me directly.";
      message.style.color = "#ff8f8f";
      console.error("EmailJS is not configured. Add your Public Key, Service ID, and Template ID in script.js.");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    message.textContent = "Sending your inquiry...";
    message.style.color = "#9da2ff";

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form
      );

      message.textContent = "Thank you! Your inquiry has been sent successfully.";
      message.style.color = "#8ff0b0";
      form.reset();
    } catch (error) {
      console.error("EmailJS send error:", error);
      message.textContent = "Sorry, we couldn't send your inquiry. Please try again or contact me directly.";
      message.style.color = "#ff8f8f";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Inquiry";
    }
  });
}
