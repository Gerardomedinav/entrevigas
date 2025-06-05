(function ($) {
  "use strict";

  // Preloader
  $(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  var nav = $("nav");
  var navHeight = nav.outerHeight();

  // ScrollReveal
  window.sr = ScrollReveal();
  sr.reveal(".foo", { duration: 1000, delay: 15 });

  // Owl Carousel
  $("#carousel").owlCarousel({
    loop: true,
    margin: -1,
    items: 1,
    nav: true,
    navText: [
      '<i class="ion-ios-arrow-back" aria-hidden="true"></i>',
      '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>',
    ],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
  });

  // Animate Carousel
  $(".intro-carousel").on("translate.owl.carousel", function () {
    $(".intro-content .intro-title").removeClass("zoomIn animated").hide();
    $(".intro-content .intro-price").removeClass("fadeInUp animated").hide();
    $(".intro-content .intro-title-top, .intro-content .spacial")
      .removeClass("fadeIn animated")
      .hide();
  });

  $(".intro-carousel").on("translated.owl.carousel", function () {
    $(".intro-content .intro-title").addClass("zoomIn animated").show();
    $(".intro-content .intro-price").addClass("fadeInUp animated").show();
    $(".intro-content .intro-title-top, .intro-content .spacial")
      .addClass("fadeIn animated")
      .show();
  });

  // Navbar Collapse
  $(".navbar-toggle-box-collapse").on("click", function () {
    $("body").removeClass("box-collapse-closed").addClass("box-collapse-open");
  });
  $(".close-box-collapse, .click-closed").on("click", function () {
    $("body").removeClass("box-collapse-open").addClass("box-collapse-closed");
    $(".menu-list ul").slideUp(700);
  });

  // Navbar Menu Reduce
  $(window).trigger("scroll");
  $(window).bind("scroll", function () {
    var pixels = 50;
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $(".navbar-default").addClass("navbar-reduce");
      $(".navbar-default").removeClass("navbar-trans");
    } else {
      $(".navbar-default").addClass("navbar-trans");
      $(".navbar-default").removeClass("navbar-reduce");
    }
    if ($(window).scrollTop() > top) {
      $(".scrolltop-mf").fadeIn(1000, "easeInOutExpo");
    } else {
      $(".scrolltop-mf").fadeOut(1000, "easeInOutExpo");
    }
  });

  // Property Carousel
  $("#property-carousel").owlCarousel({
    loop: true,
    margin: 30,
    responsive: {
      0: { items: 1 },
      769: { items: 2 },
      992: { items: 3 },
    },
  });

  // Property Single Carousel
  $("#property-single-carousel").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    navText: [
      '<i class="ion-ios-arrow-back" aria-hidden="true"></i>',
      '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>',
    ],
    responsive: {
      0: { items: 1 },
    },
  });

  // News Carousel
  $("#new-carousel").owlCarousel({
    loop: true,
    margin: 30,
    responsive: {
      0: { items: 1 },
      769: { items: 2 },
      992: { items: 3 },
    },
  });

  // Testimonials Carousel
  $("#testimonial-carousel").owlCarousel({
    margin: 0,
    autoplay: true,
    nav: true,
    animateOut: "fadeOut",
    animateIn: "fadeInUp",
    navText: [
      '<i class="ion-ios-arrow-back" aria-hidden="true"></i>',
      '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>',
    ],
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
    },
  });
})(jQuery);

function initLeafletMap() {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  const lat = -26.188520074771663;
  const lng = -58.16360024736644;

  const map = L.map("map").setView([lat, lng], 16);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      `
      <div style="display: flex; align-items: center; font-weight: bold;">
        <img src="img/favicon.ico" alt="logo" style="width: 40px; height: 40px; margin-right: 8px;">
        ENTREVIGAS SAS <br> Ayacucho 175 <br> Formosa, Capital

      </div>
    `
    )
    .openPopup();
}

document.addEventListener("DOMContentLoaded", function () {
  if (navigator.onLine) {
    initLeafletMap();
  } else {
    const mapDiv = document.getElementById("map");
    if (mapDiv) {
      mapDiv.innerHTML = `
        <div style="text-align:center; padding: 2rem; font-weight:bold; color: #c00;">
          ⚠️ Se requiere conexión a Internet para visualizar el mapa.
        </div>
      `;
    }
  }
});

window.addEventListener("online", initLeafletMap);

document.addEventListener("DOMContentLoaded", function () {
  const lat = -26.188520074771663;
  const lng = -58.16360024736644;
  const googleMapsURL = `https://www.google.com/maps?q=${lat},${lng}`;

  const openMaps = document.getElementById("open-maps");
  const copyLink = document.getElementById("copy-link");
  const shareWhatsapp = document.getElementById("share-whatsapp");

  if (openMaps) {
    openMaps.addEventListener("click", function () {
      window.open(googleMapsURL, "_blank");
    });
  }

  if (copyLink) {
    copyLink.addEventListener("click", function () {
      navigator.clipboard
        .writeText(googleMapsURL)
        .then(() => {
          alert("📋 Enlace copiado:\n" + googleMapsURL);
        })
        .catch(() => {
          alert("No se pudo copiar. Usá clic derecho > copiar.");
        });
    });
  }

  if (shareWhatsapp) {
    shareWhatsapp.addEventListener("click", function () {
      const message = `📍 Ubicación de ENTREVIGAS SAS - Ayacucho 175, Formosa, Capital: ${googleMapsURL}`;
      const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");
    });
  }
});
