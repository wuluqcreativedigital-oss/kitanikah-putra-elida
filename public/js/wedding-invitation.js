/**
 * Wedding Invitation JavaScript
 * Dynamic Wedding Invitation with Guest Name, Music Control, and Animations
 */

// ==================== GUEST NAME FUNCTIONALITY ====================

/**
 * Get guest name from URL parameter
 * Supports multiple formats: ?nama=, ?guest=, or direct parameter
 */
function getGuestNameFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName =
    urlParams.get("nama") ||
    urlParams.get("guest") ||
    decodeURIComponent(window.location.search.substring(1));
  return guestName ? guestName.replace(/\+/g, " ") : "Tamu Undangan";
}

/**
 * Update guest name in all greeting text elements
 */
function updateGuestName() {
  const guestName = getGuestNameFromURL();
  const greetingElements = document.querySelectorAll(".greeting-text");

  greetingElements.forEach((element) => {
    const currentText = element.innerHTML;
    const updatedText = currentText.replace(
      /(&nbsp;)?Tamu Undangan/g,
      guestName,
    );
    element.innerHTML = updatedText;
  });
}

// ==================== MUSIC CONTROL FUNCTIONALITY ====================

let isPlaying = false;
let musicLoaded = false;

/**
 * Lazy load music when needed
 */
function loadMusic() {
  const music = document.getElementById("backgroundMusic");
  if (!music || musicLoaded) return;

  music.preload = "auto";
  musicLoaded = true;
}

/**
 * Toggle background music play/pause
 */
function toggleMusic() {
  const music = document.getElementById("backgroundMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");

  if (!music) return;

  // Load music if not already loaded
  if (!musicLoaded) {
    loadMusic();
  }

  if (isPlaying) {
    music.pause();
    musicToggle.classList.remove("playing");
    musicToggle.title = "Putar Musik";
    isPlaying = false;
  } else {
    music.play().catch(function (error) {
      console.log("Could not play music:", error);
    });
    musicToggle.classList.add("playing");
    musicToggle.title = "Jeda Musik";
    isPlaying = true;
  }
}

// ==================== COUNTDOWN FUNCTIONALITY ====================

const targetDate = new Date("2026-04-05T08:00:00").getTime(); // Wedding date: April 5, 2026

/**
 * Update countdown timer display
 */
function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Check if countdown elements exist
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    return; // Exit if elements don't exist
  }

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysElement.textContent = days.toString().padStart(2, "0");
    hoursElement.textContent = hours.toString().padStart(2, "0");
    minutesElement.textContent = minutes.toString().padStart(2, "0");
    secondsElement.textContent = seconds.toString().padStart(2, "0");
  } else {
    // Countdown has ended
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
  }
}

// ==================== SLIDER FUNCTIONALITY ====================

let currentStoryIndex = 0;

/**
 * Show specific slide in story slider
 */
function showSlide(index) {
  const storySlides = document.querySelectorAll(".story-slide");
  const storyDots = document.querySelectorAll(".story__slider-dots .dot");

  // Hide all slides
  storySlides.forEach((slide) => (slide.style.display = "none"));

  // Remove active class from all dots
  storyDots.forEach((dot) => dot.classList.remove("slick-active"));

  // Show current slide
  if (storySlides[index]) {
    storySlides[index].style.display = "block";
    storyDots[index].classList.add("slick-active");
  }
}

/**
 * Navigate to specific slide
 */
function currentSlide(index) {
  currentStoryIndex = index;
  showSlide(index);
}

// ==================== RSVP FUNCTIONALITY ====================

/**
 * Submit RSVP form via WhatsApp
 */
function submitRSVP(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value;
  const jumlah = document.getElementById("jumlah").value;
  const ucapan = document.getElementById("ucapan").value;

  if (!nama || !jumlah) {
    alert("Mohon lengkapi nama dan jumlah hadir");
    return;
  }

  const message = `Reservasi Kehadiran Pernikahan Lukman & Wulan

Nama: ${nama}
Jumlah Hadir: ${jumlah} Orang
Pesan: ${ucapan || "Tidak ada pesan"}

Terima kasih atas konfirmasi kehadiran Anda!`;

  const whatsappURL = `https://wa.me/6283169705395?text=${encodeURIComponent(
    message,
  )}`;
  window.open(whatsappURL, "_blank");
}

// ==================== BANK ACCOUNT COPY FUNCTIONALITY ====================

/**
 * Copy bank account number to clipboard
 */
function copyBankAccount(elementId, statusId) {
  const element = document.getElementById(elementId);
  const statusElement = document.getElementById(statusId);
  const text = element.textContent;

  // Create a temporary textarea element
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);

  // Select and copy the text
  textarea.select();
  document.execCommand("copy");

  // Remove the temporary element
  document.body.removeChild(textarea);

  // Show success message
  statusElement.textContent = "Nomor rekening berhasil disalin!";
  statusElement.style.opacity = "1";

  // Hide message after 3 seconds
  setTimeout(() => {
    statusElement.style.opacity = "0";
  }, 3000);
}

// ==================== INVITATION OPEN FUNCTIONALITY ====================

/**
 * Open invitation and show all content sections
 */
function openInvitation() {
  // Hide top cover
  const topCover = document.querySelector(".top-cover");
  if (topCover) {
    topCover.style.display = "none";
  }

  // Show detail content
  const detailContent = document.querySelector("#detailContent");
  if (detailContent) {
    detailContent.style.display = "block";
    detailContent.style.visibility = "visible";
    detailContent.classList.add("show");
  }

  // Enable scrolling on secondary-pane
  const secondaryPane = document.querySelector(".secondary-pane");
  if (secondaryPane) {
    secondaryPane.classList.add("opened");
    secondaryPane.style.overflow = "auto";
    secondaryPane.style.height = "auto";
  }

  // Show all main content sections (except RSVP which should stay hidden)
  const sectionsToShow = [
    ".quote-wrap",
    ".couple-wrap",
    ".save-date-wrap",
    ".agenda-wrap",
    ".h-fit.relative.text-black", // gallery section
    ".wedding-gift-wrap",
    ".gift-section-wrap",
    ".footnote-wrap",
  ];

  sectionsToShow.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.display = "block";
    }
  });

  // Update guest name again in case it was missed
  updateGuestName();

  // Initialize AOS animations
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }

  // Scroll to detail content with delay to ensure proper display
  setTimeout(() => {
    const detailContent = document.getElementById("detailContent");
    if (detailContent) {
      // Ensure detailContent is visible
      detailContent.scrollIntoView({ behavior: "smooth", block: "start" });

      // Debug: log element visibility
      console.log("detailContent display:", detailContent.style.display);
      console.log("detailContent visibility:", detailContent.style.visibility);
      console.log("detailContent offsetHeight:", detailContent.offsetHeight);
    }
  }, 500);

  // Auto-play music when user opens invitation
  setTimeout(() => {
    const music = document.getElementById("backgroundMusic");
    if (music && !isPlaying) {
      toggleMusic();
    }
  }, 1000);
}

// ==================== INITIALIZATION ====================

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener("DOMContentLoaded", function () {
  // Update guest name from URL parameter
  updateGuestName();

  // Initialize AOS animations
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1200,
      once: false,
      offset: 100,
    });
  }

  // Setup music control
  const musicToggle = document.getElementById("musicToggle");
  if (musicToggle) {
    musicToggle.addEventListener("click", toggleMusic);
    musicToggle.title = "Putar Musik";
  }

  // Initialize countdown when DOM is ready
  updateCountdown();
  // Update countdown every second
  setInterval(updateCountdown, 1000);

  // Initialize first slide for story slider
  showSlide(0);
});

// ==================== GLOBAL CONFIGURATION ====================

// Event timestamp
var EVENT = 1729310400;

// Protocol configuration
var PROTOCOL = {
  slider: "#protocol-slider",
  dots: "#protocol-dots",
};
