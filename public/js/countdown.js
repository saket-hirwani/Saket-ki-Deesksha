/**
 * Saket ❤️ Deeksha Wedding Invitation
 * Live Countdown Timer
 * Target: 12 December 2026 (Controlled by weddingConfig.weddingDate)
 */

(function () {
  'use strict';

  var countdownInterval = null;

  function padZero(num) {
    return num < 10 ? '0' + num : num.toString();
  }

  function getTargetTime() {
    var dateStr = (window.weddingConfig && window.weddingConfig.weddingDate) || "2026-12-12";
    // Wedding day midnight or ceremony morning (00:00:00 local time)
    var parts = dateStr.split('-');
    var target = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 0, 0, 0);
    return target.getTime();
  }

  function updateCountdown() {
    var daysEl = document.getElementById('countdown-days');
    var hoursEl = document.getElementById('countdown-hours');
    var minutesEl = document.getElementById('countdown-minutes');
    var secondsEl = document.getElementById('countdown-seconds');
    var timerContainer = document.getElementById('countdown-timer');
    var messageEl = document.getElementById('countdown-message');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    var targetTime = getTargetTime();
    var now = new Date().getTime();
    var distance = targetTime - now;

    if (distance <= 0) {
      if (timerContainer) timerContainer.style.display = 'none';
      if (messageEl) {
        messageEl.style.display = 'block';
        var currentLang = (window.WeddingApp && window.WeddingApp.currentLang) || 'en';
        var t = (window.translations && window.translations[currentLang]) || window.translations.en;
        messageEl.textContent = t.countdown.completed || "Today is the day! ❤️";
      }
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
      return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = padZero(days);
    hoursEl.textContent = padZero(hours);
    minutesEl.textContent = padZero(minutes);
    secondsEl.textContent = padZero(seconds);
  }

  function initCountdown() {
    updateCountdown();
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  window.WeddingCountdown = {
    init: initCountdown,
    refresh: updateCountdown
  };
})();
