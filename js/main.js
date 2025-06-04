(function ($) {
  "use strict";

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  var nav = $('nav');
  var navHeight = nav.outerHeight();

  // ScrollReveal
  window.sr = ScrollReveal();
  sr.reveal('.foo', { duration: 1000, delay: 15 });

  // Owl Carousel
  $('#carousel').owlCarousel({
    loop: true,
    margin: -1,
    items: 1,
    nav: true,
    navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  });

  // Animate Carousel
  $('.intro-carousel').on('translate.owl.carousel', function () {
    $('.intro-content .intro-title').removeClass('zoomIn animated').hide();
    $('.intro-content .intro-price').removeClass('fadeInUp animated').hide();
    $('.intro-content .intro-title-top, .intro-content .spacial').removeClass('fadeIn animated').hide();
  });

  $('.intro-carousel').on('translated.owl.carousel', function () {
    $('.intro-content .intro-title').addClass('zoomIn animated').show();
    $('.intro-content .intro-price').addClass('fadeInUp animated').show();
    $('.intro-content .intro-title-top, .intro-content .spacial').addClass('fadeIn animated').show();
  });

  // Navbar Collapse
  $('.navbar-toggle-box-collapse').on('click', function () {
    $('body').removeClass('box-collapse-closed').addClass('box-collapse-open');
  });
  $('.close-box-collapse, .click-closed').on('click', function () {
    $('body').removeClass('box-collapse-open').addClass('box-collapse-closed');
    $('.menu-list ul').slideUp(700);
  });

  // Navbar Menu Reduce
  $(window).trigger('scroll');
  $(window).bind('scroll', function () {
    var pixels = 50;
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $('.navbar-default').addClass('navbar-reduce');
      $('.navbar-default').removeClass('navbar-trans');
    } else {
      $('.navbar-default').addClass('navbar-trans');
      $('.navbar-default').removeClass('navbar-reduce');
    }
    if ($(window).scrollTop() > top) {
      $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
    } else {
      $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
    }
  });

  // Property Carousel
  $('#property-carousel').owlCarousel({
    loop: true,
    margin: 30,
    responsive: {
      0: { items: 1 },
      769: { items: 2 },
      992: { items: 3 }
    }
  });

  // Property Single Carousel
  $('#property-single-carousel').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
    responsive: {
      0: { items: 1 }
    }
  });

  // News Carousel
  $('#new-carousel').owlCarousel({
    loop: true,
    margin: 30,
    responsive: {
      0: { items: 1 },
      769: { items: 2 },
      992: { items: 3 }
    }
  });

  // Testimonials Carousel
  $('#testimonial-carousel').owlCarousel({
    margin: 0,
    autoplay: true,
    nav: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeInUp',
    navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 }
    }
  });

})(jQuery);

// Script para mapa de Google
function initMap() {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  const location = { lat: -26.188520074771663, lng: -58.16360024736644 };

  const mapOptions = {
    center: location,
    zoom: 16,
  };

  const map = new google.maps.Map(mapDiv, mapOptions);

  const marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      scaledSize: new google.maps.Size(40, 40),
    },
    title: "ENTREVIGAS SAS"
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="display: flex; align-items: center; font-weight: bold;">
        <img src="img/favicon.ico" alt="logo" style="width: 40px; height: 40px; margin-right: 8px;">
        ENTREVIGAS SAS
      </div>
    `
  });

  infoWindow.open(map, marker);
}

function loadGoogleMaps() {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  if (navigator.onLine) {
    const script = document.createElement("script");
   script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyADQ_a0eH87DL2KhYW9BgZTma-LkNEMIXo&callback=initMap&loading=async";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  } else {
    mapDiv.innerHTML = `
      <div style="text-align:center; padding: 2rem; font-weight:bold; color: #c00;">
        ⚠️ Se requiere conexión a Internet para visualizar el mapa.
      </div>
    `;
  }
}

// Cargar el mapa cuando se carga la página
document.addEventListener("DOMContentLoaded", loadGoogleMaps);

// Intentar recargar el mapa si vuelve la conexión
window.addEventListener("online", loadGoogleMaps);
