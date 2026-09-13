/**
 * Saket ❤️ Deeksha Wedding Invitation
 * Wedding Photo Gallery & Interactive Lightbox
 * Features: Editorial Masonry, Mobile 2-column, Lightbox with Prev/Next,
 * Keyboard navigation, Mobile Touch-Swipe, and Graceful Offline/Missing Fallbacks.
 */

(function () {
  'use strict';

  // 18 Curated gallery placeholders representing luxury Indian wedding aesthetics
  var galleryImages = [
    { src: 'assets/images/gallery-01.jpg', alt: 'Saket & Deeksha - Golden Hour Portrait', caption: 'Golden Hour Harmony' },
    { src: 'assets/images/gallery-02.jpg', alt: 'Saket & Deeksha - Elegant Traditional Attire', caption: 'Grace & Tradition' },
    { src: 'assets/images/gallery-03.jpg', alt: 'Mehendi Details & Henna Motifs', caption: 'Intricate Henna Swirls' },
    { src: 'assets/images/gallery-04.jpg', alt: 'Joyful Laughter & Candid Moments', caption: 'Candid Joy' },
    { src: 'assets/images/gallery-05.jpg', alt: 'Haldi Petals & Turmeric Splendor', caption: 'Sunny Haldi Smiles' },
    { src: 'assets/images/gallery-06.jpg', alt: 'Sangeet Choreography & Musical Celebration', caption: 'Rhythms of Love' },
    { src: 'assets/images/gallery-07.jpg', alt: 'Sacred Floral Garland Varmala', caption: 'The Sacred Exchange' },
    { src: 'assets/images/gallery-08.jpg', alt: 'Royal Venue Decor & Chandeliers', caption: 'Saptapadi Grandeur' },
    { src: 'assets/images/gallery-09.jpg', alt: 'Saket & Deeksha - Hand in Hand', caption: 'Hand in Hand Forever' },
    { src: 'assets/images/gallery-10.jpg', alt: 'The Royal Sherwani & Silk Dupatta', caption: 'Regal Splendor' },
    { src: 'assets/images/gallery-11.jpg', alt: 'Bridal Lehenga Details & Embroidery', caption: 'Artisan Zardozi' },
    { src: 'assets/images/gallery-12.jpg', alt: 'Saat Phere Around The Holy Agni', caption: 'Seven Eternal Vows' },
    { src: 'assets/images/gallery-13.jpg', alt: 'Twilight Palace Garden Lights', caption: 'Twilight Romance' },
    { src: 'assets/images/gallery-14.jpg', alt: 'Warm Family Gatherings & Blessings', caption: 'Elders’ Blessings' },
    { src: 'assets/images/gallery-15.jpg', alt: 'Wedding Rings & Sparkling Jewels', caption: 'The Sparkling Vow' },
    { src: 'assets/images/gallery-16.jpg', alt: 'Saket & Deeksha - Quiet Stolen Glance', caption: 'Stolen Whispers' },
    { src: 'assets/images/gallery-17.jpg', alt: 'Grand Palace Entryway & Marigold Arch', caption: 'Floral Welcome' },
    { src: 'assets/images/gallery-18.jpg', alt: 'Reception Gala & Champagne Toast', caption: 'Toast to Eternity' }
  ];

  var currentIndex = 0;
  var touchStartX = 0;
  var touchEndX = 0;

  function renderGalleryGrid() {
    var container = document.getElementById('gallery-grid-container');
    if (!container) return;

    container.innerHTML = '';

    galleryImages.forEach(function (item, index) {
      var itemWrapper = document.createElement('div');
      itemWrapper.className = 'gallery-item group';
      itemWrapper.setAttribute('data-index', index);

      var aspectClasses = (index % 5 === 0 || index % 7 === 0) 
        ? 'aspect-[3/4]' 
        : (index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square');

      itemWrapper.innerHTML = 
        '<div class="relative overflow-hidden rounded-xl bg-[#F7F3EB] shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ' + aspectClasses + '">' +
          '<img src="' + item.src + '" alt="' + item.alt + '" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onerror="WeddingGallery.handleImageError(this, ' + (index + 1) + ')">' +
          '<div class="absolute inset-0 bg-gradient-to-t from-[#1E1B18]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">' +
            '<p class="text-xs uppercase tracking-widest text-[#E8D4A2] font-medium mb-1">Saket ❤️ Deeksha</p>' +
            '<h4 class="text-base font-serif font-medium tracking-wide">' + item.caption + '</h4>' +
          '</div>' +
          '<button type="button" class="absolute inset-0 w-full h-full z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A059] rounded-xl" aria-label="Open photo ' + (index + 1) + ' in lightbox"></button>' +
        '</div>';

      itemWrapper.querySelector('button').addEventListener('click', function () {
        openLightbox(index);
      });

      container.appendChild(itemWrapper);
    });
  }

  function handleImageError(imgEl, number) {
    if (!imgEl) return;
    // Elegant SVG fallback with romantic gold mandala monogram and blush ivory background
    var fallbackSvg = 
      "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='750' viewBox='0 0 600 750'%3E" +
      "%3Crect width='600' height='750' fill='%23FAF6F0'/%3E" +
      "%3Crect x='20' y='20' width='560' height='710' fill='none' stroke='%23D4AF37' stroke-width='1.5' stroke-dasharray='6 6' rx='16'/%3E" +
      "%3Ccircle cx='300' cy='310' r='90' fill='%23F4EAE6' stroke='%23C5A059' stroke-width='1'/%3E" +
      "%3Cpath d='M300 245 C280 275 250 295 250 320 C250 350 280 375 300 395 C320 375 350 350 350 320 C350 295 320 275 300 245 Z' fill='%23C5A059' opacity='0.25'/%3E" +
      "%3Ctext x='300' y='320' font-family='Georgia,serif' font-size='32' text-anchor='middle' fill='%235C1D24' font-weight='bold'%3ES %26 D%3C/text%3E" +
      "%3Ctext x='300' y='350' font-family='sans-serif' font-size='13' text-anchor='middle' fill='%238A7356' letter-spacing='3'%3E12 %E2%80%A2 12 %E2%80%A2 2026%3C/text%3E" +
      "%3Ctext x='300' y='460' font-family='Georgia,serif' font-size='22' text-anchor='middle' fill='%232B2625'%3ECherished Moment " + number + "%3C/text%3E" +
      "%3Ctext x='300' y='490' font-family='sans-serif' font-size='13' text-anchor='middle' fill='%23776E6A'%3Eassets/images/gallery-" + (number < 10 ? '0' + number : number) + ".jpg%3C/text%3E" +
      "%3C/svg%3E";
    imgEl.src = fallbackSvg;
  }

  function openLightbox(index) {
    currentIndex = index;
    var modal = document.getElementById('gallery-lightbox');
    if (!modal) return;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    updateLightboxContent();
  }

  function closeLightbox() {
    var modal = document.getElementById('gallery-lightbox');
    if (!modal) return;

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  function nextPhoto() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightboxContent();
  }

  function prevPhoto() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxContent();
  }

  function updateLightboxContent() {
    var imgEl = document.getElementById('lightbox-img');
    var captionEl = document.getElementById('lightbox-caption');
    var counterEl = document.getElementById('lightbox-counter');

    if (!imgEl || !galleryImages[currentIndex]) return;

    var currentItem = galleryImages[currentIndex];
    imgEl.src = currentItem.src;
    imgEl.alt = currentItem.alt;
    imgEl.onerror = function () {
      handleImageError(this, currentIndex + 1);
    };

    if (captionEl) captionEl.textContent = currentItem.caption;
    if (counterEl) counterEl.textContent = (currentIndex + 1) + ' / ' + galleryImages.length;
  }

  function initLightboxEvents() {
    var closeBtn = document.getElementById('lightbox-close-btn');
    var nextBtn = document.getElementById('lightbox-next-btn');
    var prevBtn = document.getElementById('lightbox-prev-btn');
    var modal = document.getElementById('gallery-lightbox');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', nextPhoto);
    if (prevBtn) prevBtn.addEventListener('click', prevPhoto);

    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal || e.target.id === 'lightbox-backdrop') {
          closeLightbox();
        }
      });

      // Mobile Touch Swipe Handling
      modal.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      modal.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
      }, { passive: true });
    }

    // Keyboard Navigation
    document.addEventListener('keydown', function (e) {
      var modal = document.getElementById('gallery-lightbox');
      if (!modal || modal.classList.contains('hidden')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextPhoto();
      } else if (e.key === 'ArrowLeft') {
        prevPhoto();
      }
    });
  }

  function handleSwipeGesture() {
    var threshold = 40;
    if (touchEndX < touchStartX - threshold) {
      // Swiped left -> next photo
      nextPhoto();
    } else if (touchEndX > touchStartX + threshold) {
      // Swiped right -> prev photo
      prevPhoto();
    }
  }

  function initGallery() {
    renderGalleryGrid();
    initLightboxEvents();
  }

  window.WeddingGallery = {
    init: initGallery,
    handleImageError: handleImageError,
    open: openLightbox,
    close: closeLightbox,
    next: nextPhoto,
    prev: prevPhoto
  };
})();
