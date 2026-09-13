/**
 * Saket ❤️ Deeksha Wedding Invitation
 * Main Application Orchestrator & Central Configuration
 * Domain: https://saketkideeksha.com
 */

// ==================================================
// 37. CENTRAL WEDDING CONFIGURATION
// ==================================================
const weddingConfig = {
  groom: "Saket",
  bride: "Deeksha",
  weddingDate: "2026-12-12",
  venue: "Saptapadi Palace, Hanoda",
  address: "Bosri Hanoda Road, Durg, Chhattisgarh, India",
  mapsUrl: "https://maps.app.goo.gl/GNADEw5rV7HUUakZ6",

  events: {
    mehendi: {
      date: "2026-12-10",
      title: "Mehendi Ceremony"
      // Note: No invented time. Display date only.
    },
    sangeet: {
      date: "2026-12-10",
      title: "Sangeet & Musical Night"
      // Note: No invented time. Display date only.
    },
    haldi: {
      date: "2026-12-11",
      time: "11:00 AM onwards",
      title: "Haldi Rasam"
    },
    wedding: {
      date: "2026-12-12",
      title: "Wedding Ceremony (Saat Phere)"
      // Note: No invented time. Display date only.
    },
    reception: {
      date: "2026-12-13",
      title: "Wedding Reception & Blessings"
      // Note: No invented time. Display date only.
    }
  },

  websiteUrl: "https://www.saketkideeksha.in",
  defaultLanguage: "hi",
  showVideoSection: true // toggle video section
};

window.weddingConfig = weddingConfig;

(function () {
  'use strict';

  var currentLang = 'hi';
  var guestName = '';

  // Detect language from URL (Path, Query Parameter & Hash)
  function detectLanguageFromUrl() {
    try {
      // 1. Check pathname (e.g. /hi/, /hi, /hindi, /cg/, /cg, /en/, /en)
      var path = window.location.pathname.toLowerCase();
      var pathSegments = path.split('/').filter(Boolean);
      for (var i = 0; i < pathSegments.length; i++) {
        var seg = pathSegments[i];
        if (seg === 'hi' || seg === 'hindi') return 'hi';
        if (seg === 'cg' || seg === 'chhattisgarhi') return 'cg';
        if (seg === 'en' || seg === 'english') return 'en';
      }

      // 2. Check query parameter ?lang=hi
      var searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('lang')) {
        var l = searchParams.get('lang').toLowerCase();
        if (['hi', 'cg', 'en'].indexOf(l) !== -1) return l;
      }

      // 3. Check hash #hi or #/hi
      var hash = window.location.hash.toLowerCase().replace(/^[#/]+/, '');
      if (hash === 'hi' || hash === 'hindi') return 'hi';
      if (hash === 'cg' || hash === 'chhattisgarhi') return 'cg';
      if (hash === 'en' || hash === 'english') return 'en';
    } catch (e) {
      console.warn('URL language detection error:', e);
    }
    return null;
  }

  // Synchronize URL with active language (so address bar & sharing always have language info)
  function syncUrlWithLanguage(lang) {
    try {
      var currentUrl = new URL(window.location.href);
      if (currentUrl.searchParams.get('lang') !== lang) {
        currentUrl.searchParams.set('lang', lang);

        // Keep address bar synced (safe check for iframe sandbox restrictions)
        if (window.history && window.history.replaceState) {
          try {
            window.history.replaceState({ lang: lang }, '', currentUrl.pathname + '?' + currentUrl.searchParams.toString() + currentUrl.hash);
          } catch (historyErr) {
            // In restricted iframe preview environments (e.g. AI Studio preview), SecurityError may be thrown
          }
        }
      }
    } catch (e) {
      // Safe fallback
    }

    // Update live URL preview in the sharing card
    var previewEl = document.getElementById('active-share-url-preview');
    if (previewEl) {
      var base = (weddingConfig && weddingConfig.websiteUrl) || window.location.origin;
      previewEl.textContent = base + '/?lang=' + lang;
    }
  }

  // Get query params and detect active language
  function parseQueryParams() {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.has('guest')) {
        guestName = params.get('guest').trim();
      }
    } catch (e) {
      console.warn('URLSearchParams error:', e);
    }

    // 1st priority: Explicit URL path/query/hash
    var urlLang = detectLanguageFromUrl();
    if (urlLang) {
      currentLang = urlLang;
      return;
    }

    // 2nd priority: Saved language in localStorage
    try {
      var saved = localStorage.getItem('saket_deeksha_lang');
      if (saved && ['hi', 'cg', 'en'].indexOf(saved) !== -1) {
        currentLang = saved;
        return;
      }
    } catch (e) {
      // Ignore
    }

    // Default: Hindi ('hi')
    currentLang = 'hi';
  }

  // Load persisted language
  function loadPersistedLanguage() {
    // Handled in parseQueryParams
  }

  function saveLanguage(lang) {
    try {
      localStorage.setItem('saket_deeksha_lang', lang);
    } catch (e) {
      // Ignore if localStorage unavailable
    }
  }

  // Update personalized guest greeting
  function updateGuestPersonalization() {
    var greetingElements = document.querySelectorAll('.personalized-guest-greeting');
    var t = (window.translations && window.translations[currentLang]) || window.translations.hi || window.translations.en;
    var greetingText = '';

    if (guestName) {
      greetingText = t.personalization.withGuest.replace('{guest}', guestName);
    } else {
      greetingText = t.personalization.defaultGreeting;
    }

    greetingElements.forEach(function (el) {
      el.textContent = greetingText;
    });
  }

  // Translate all DOM elements marked with data-i18n
  function applyLanguage(lang) {
    if (!window.translations || !window.translations[lang]) {
      lang = 'hi';
    }
    currentLang = lang;
    saveLanguage(lang);
    syncUrlWithLanguage(lang);

    var t = window.translations[lang];

    // Update document title and meta description
    if (t.meta) {
      document.title = t.meta.title;
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', t.meta.description);
      var ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', t.meta.title);
      var ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', t.meta.description);
    }

    // Translate marked elements
    var elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = getNestedTranslation(t, key);
      if (value !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.getAttribute('placeholder')) {
            el.setAttribute('placeholder', value);
          }
        } else {
          el.innerHTML = value;
        }
      }
    });

    // Update guest greeting
    updateGuestPersonalization();

    // Update language switcher active states
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active', 'bg-[#C5A059]', 'text-white');
        btn.classList.remove('text-[#2B2625]', 'hover:text-[#C5A059]');
      } else {
        btn.classList.remove('active', 'bg-[#C5A059]', 'text-white');
        btn.classList.add('text-[#2B2625]', 'hover:text-[#C5A059]');
      }
    });

    // Refresh countdown & music labels
    if (window.WeddingCountdown && window.WeddingCountdown.refresh) {
      window.WeddingCountdown.refresh();
    }
    if (window.WeddingMusic && window.WeddingMusic.updateUI) {
      window.WeddingMusic.updateUI();
    }

    // Set html lang attribute and body class for typography switching
    document.documentElement.setAttribute('lang', lang === 'cg' ? 'hi' : lang);
    document.body.classList.remove('lang-hi', 'lang-en', 'lang-cg');
    document.body.classList.add('lang-' + lang);
  }

  function getNestedTranslation(obj, keyPath) {
    if (!keyPath) return undefined;
    var keys = keyPath.split('.');
    var current = obj;
    for (var i = 0; i < keys.length; i++) {
      if (current[keys[i]] === undefined) return undefined;
      current = current[keys[i]];
    }
    return current;
  }

  // Opening Screen Animation Controller
  function initOpeningExperience() {
    var overlay = document.getElementById('invitation-opening-screen');
    var enterBtn = document.getElementById('enter-invitation-btn');
    var skipBtn = document.getElementById('skip-opening-btn');
    var quickBtn = document.getElementById('quick-enter-top-btn');
    var sealTrigger = document.getElementById('wax-seal-open-trigger');

    var hasEntered = false;

    function closeOpening(startMusic) {
      if (!overlay || hasEntered) return;
      hasEntered = true;

      // Unlock body scrolling immediately
      document.body.classList.remove('overflow-hidden');
      overlay.classList.add('opening-unfold-exit');

      setTimeout(function () {
        overlay.style.display = 'none';
      }, 650);

      if (startMusic && window.WeddingMusic) {
        window.WeddingMusic.play();
      }
    }

    if (enterBtn) {
      enterBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeOpening(true);
      });
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeOpening(false);
      });
    }

    if (quickBtn) {
      quickBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeOpening(false);
      });
    }

    if (sealTrigger) {
      sealTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        closeOpening(true);
      });
      sealTrigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          closeOpening(true);
        }
      });
    }

    // Dismiss if tapping the outer backdrop area
    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
          closeOpening(true);
        }
      });
    }

    // Keyboard support: Escape or Enter
    document.addEventListener('keydown', function (e) {
      if (overlay && overlay.style.display !== 'none') {
        if (e.key === 'Escape') {
          closeOpening(false);
        }
      }
    });

    // Prevent body scroll during opening screen
    if (overlay && overlay.style.display !== 'none') {
      document.body.classList.add('overflow-hidden');
    }
  }

  // Sticky Navbar Controller
  function initNavigation() {
    var navbar = document.getElementById('main-navbar');
    var mobileMenu = document.getElementById('mobile-nav-menu');
    var mobileToggle = document.getElementById('mobile-menu-toggle');
    var mobileClose = document.getElementById('mobile-menu-close');

    // Sticky shadow and background on scroll
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('is-sticky', 'shadow-md', 'bg-[#FAF7F2]/95', 'backdrop-blur-md');
        navbar.classList.remove('bg-transparent');
      } else {
        navbar.classList.remove('is-sticky', 'shadow-md', 'bg-[#FAF7F2]/95', 'backdrop-blur-md');
        navbar.classList.add('bg-transparent');
      }
    }, { passive: true });

    // Mobile menu toggle
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', function () {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        document.body.classList.add('overflow-hidden');
      });
    }

    function closeMobileMenu() {
      if (mobileMenu) {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        document.body.classList.remove('overflow-hidden');
      }
    }

    if (mobileClose) {
      mobileClose.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu on clicking any navigation link
    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        closeMobileMenu();
        var targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          var targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Language switcher buttons click listener
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = this.getAttribute('data-lang');
        applyLanguage(lang);
      });
    });
  }

  // Calendar .ics and Google Calendar Generators
  function initCalendarActions() {
    document.querySelectorAll('[data-calendar-event]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var eventKey = this.getAttribute('data-calendar-event');
        var type = this.getAttribute('data-calendar-type') || 'google';
        handleCalendarEvent(eventKey, type);
      });
    });
  }

  function handleCalendarEvent(eventKey, type) {
    var eventData = weddingConfig.events[eventKey];
    if (!eventData) return;

    var title = eventData.title + ' - Saket & Deeksha Wedding';
    var location = weddingConfig.venue + ', ' + weddingConfig.address;
    var description = 'Wedding Celebrations of Saket & Deeksha. Venue: ' + location + '. Details at https://www.saketkideeksha.in';

    // Format start/end times based on availability
    // Format: YYYYMMDDTHHmmssZ or date-only YYYYMMDD
    var dateClean = eventData.date.replace(/-/g, '');
    var startIso = dateClean;
    var endIso = dateClean;

    if (eventData.time && eventData.time.indexOf('11:00 AM') !== -1) {
      // Haldi
      startIso = dateClean + 'T053000Z'; // 11:00 AM IST = 05:30 UTC
      endIso = dateClean + 'T093000Z';
    }

    if (type === 'google') {
      var gcalUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
        '&text=' + encodeURIComponent(title) +
        '&dates=' + startIso + '/' + endIso +
        '&details=' + encodeURIComponent(description) +
        '&location=' + encodeURIComponent(location);
      window.open(gcalUrl, '_blank', 'noopener,noreferrer');
    } else if (type === 'ics') {
      generateAndDownloadIcs(title, description, location, startIso, endIso);
    }
  }

  function generateAndDownloadIcs(title, description, location, start, end) {
    var icsContent = 
      'BEGIN:VCALENDAR\n' +
      'VERSION:2.0\n' +
      'PRODID:-//Saket and Deeksha Wedding//Wedding Invitation//EN\n' +
      'CALSCALE:GREGORIAN\n' +
      'METHOD:PUBLISH\n' +
      'BEGIN:VEVENT\n' +
      'SUMMARY:' + title + '\n' +
      'DESCRIPTION:' + description + '\n' +
      'LOCATION:' + location + '\n' +
      'DTSTART:' + start + '\n' +
      'DTEND:' + end + '\n' +
      'STATUS:CONFIRMED\n' +
      'END:VEVENT\n' +
      'END:VCALENDAR';

    var blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', title.replace(/[^a-zA-Z0-9]/g, '_') + '.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Scroll Reveal Animations using IntersectionObserver
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
      observer.observe(el);
    });
  }

  // Directions & QR Download Actions
  function initVenueActions() {
    var directionsBtn = document.getElementById('get-directions-btn');
    var openMapsBtn = document.getElementById('open-maps-btn');
    var saveQrBtn = document.getElementById('save-qr-btn');

    var mapsUrl = (window.weddingConfig && window.weddingConfig.mapsUrl) || 'https://maps.app.goo.gl/GNADEw5rV7HUUakZ6';

    if (directionsBtn && directionsBtn.tagName === 'A') {
      directionsBtn.href = mapsUrl;
    }
    if (openMapsBtn && openMapsBtn.tagName === 'A') {
      openMapsBtn.href = mapsUrl;
    }

    if (saveQrBtn && window.WeddingQR) {
      saveQrBtn.addEventListener('click', function () {
        window.WeddingQR.saveAsImage('venue-qr-canvas', 'Saket-Deeksha-Venue-QR.png');
      });
    }
  }

  // Video Section Player
  function initVideoSection() {
    var videoContainer = document.getElementById('wedding-video-section');
    var playBtn = document.getElementById('play-video-btn');
    var modal = document.getElementById('video-modal');
    var closeBtn = document.getElementById('close-video-modal-btn');
    var videoIframe = document.getElementById('video-iframe');

    if (!weddingConfig.showVideoSection && videoContainer) {
      videoContainer.style.display = 'none';
      return;
    }

    if (playBtn && modal) {
      playBtn.addEventListener('click', function () {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
      });
    }

    function closeVideo() {
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
        if (videoIframe) {
          var src = videoIframe.src;
          videoIframe.src = src; // reset playback
        }
      }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeVideo);
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeVideo();
      });
    }
  }

  // DOM Content Loaded Handler
  document.addEventListener('DOMContentLoaded', function () {
    parseQueryParams();
    loadPersistedLanguage();

    // 1. Initialize Subsystems
    if (window.WeddingCountdown) window.WeddingCountdown.init();
    if (window.WeddingGallery) window.WeddingGallery.init();
    if (window.WeddingMusic) window.WeddingMusic.init();
    if (window.WeddingSharing) window.WeddingSharing.init();

    // 2. Initialize Venue QR Code dynamically
    if (window.WeddingQR) {
      window.WeddingQR.init('venue-qr-canvas', weddingConfig.mapsUrl, 260);
    }

    // 3. UI Interactions
    initOpeningExperience();
    initNavigation();
    initCalendarActions();
    initVenueActions();
    initVideoSection();
    initScrollAnimations();

    // 4. Apply Initial Language (default or persisted)
    applyLanguage(currentLang);

    // 5. Listen to browser history / URL path changes
    window.addEventListener('popstate', function () {
      var detected = detectLanguageFromUrl();
      if (detected && detected !== currentLang) {
        applyLanguage(detected);
      }
    });

    window.addEventListener('hashchange', function () {
      var detected = detectLanguageFromUrl();
      if (detected && detected !== currentLang) {
        applyLanguage(detected);
      }
    });
  });

  window.WeddingApp = {
    get currentLang() { return currentLang; },
    setLanguage: applyLanguage,
    config: weddingConfig
  };
})();
