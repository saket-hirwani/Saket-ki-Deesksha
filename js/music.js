/**
 * Saket ❤️ Deeksha Wedding Invitation
 * Background Music Controller
 * Configurable Audio Path: assets/music/wedding-song.mp3
 * <!-- REPLACE WITH WEDDING MUSIC in assets/music/wedding-song.mp3 -->
 */

(function () {
  'use strict';

  var audioEl = null;
  var isPlaying = false;
  var isMuted = false;
  var webAudioContext = null;
  var ambientOscillatorNode = null;
  var ambientGainNode = null;
  var ambientInterval = null;
  var useSynthFallback = false;

  var MUSIC_SRC = 'assets/music/wedding-song.mp3';

  // Pentatonic classical wedding Raag Yaman / Bhupali notes for gentle acoustic chime fallback
  var RAGA_FREQS = [220, 247.5, 275, 330, 371.25, 440, 495, 550, 660];

  function playSoftChime() {
    if (!webAudioContext || isMuted || !isPlaying) return;
    try {
      if (webAudioContext.state === 'suspended') {
        webAudioContext.resume();
      }
      var now = webAudioContext.currentTime;
      var osc = webAudioContext.createOscillator();
      var gain = webAudioContext.createGain();

      var freq = RAGA_FREQS[Math.floor(Math.random() * RAGA_FREQS.length)];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(gain);
      gain.connect(webAudioContext.destination);

      osc.start(now);
      osc.stop(now + 4.6);
    } catch (e) {
      // Gracefully silent
    }
  }

  function startSynthAmbient() {
    try {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!webAudioContext) {
        webAudioContext = new AudioCtx();
      }
      if (webAudioContext.state === 'suspended') {
        webAudioContext.resume();
      }
      playSoftChime();
      if (!ambientInterval) {
        ambientInterval = setInterval(playSoftChime, 2600);
      }
    } catch (e) {
      // Audio context denied or unavailable
    }
  }

  function stopSynthAmbient() {
    if (ambientInterval) {
      clearInterval(ambientInterval);
      ambientInterval = null;
    }
  }

  function updateMusicUI() {
    var btn = document.getElementById('music-toggle-btn');
    var waveContainer = document.getElementById('music-waves');
    var label = document.getElementById('music-status-text');
    var currentLang = (window.WeddingApp && window.WeddingApp.currentLang) || 'en';
    var t = (window.translations && window.translations[currentLang]) || window.translations.en;

    if (!btn) return;

    if (isPlaying && !isMuted) {
      btn.classList.add('is-playing');
      btn.setAttribute('aria-label', t.nav.musicPause || 'Pause Music');
      btn.setAttribute('title', t.nav.musicPause || 'Pause Music');
      if (waveContainer) waveContainer.classList.add('animating');
      if (label) label.textContent = t.nav.musicPause || 'Pause';
    } else {
      btn.classList.remove('is-playing');
      btn.setAttribute('aria-label', t.nav.musicPlay || 'Play Music');
      btn.setAttribute('title', t.nav.musicPlay || 'Play Music');
      if (waveContainer) waveContainer.classList.remove('animating');
      if (label) label.textContent = t.nav.musicPlay || 'Play';
    }
  }

  function initMusic() {
    audioEl = document.getElementById('wedding-audio');
    if (!audioEl) {
      audioEl = document.createElement('audio');
      audioEl.id = 'wedding-audio';
      audioEl.loop = true;
      audioEl.preload = 'none';
      document.body.appendChild(audioEl);
    }

    audioEl.src = MUSIC_SRC;

    // Error handling - if audio file does not exist, switch smoothly to synth without throwing alert/errors
    audioEl.addEventListener('error', function () {
      useSynthFallback = true;
      console.log('Wedding song mp3 not yet placed. Using soft ambient tone fallback.');
    });

    var btn = document.getElementById('music-toggle-btn');
    if (btn) {
      btn.addEventListener('click', toggleMusic);
    }

    updateMusicUI();
  }

  function playMusic() {
    isPlaying = true;
    updateMusicUI();

    if (!useSynthFallback && audioEl && audioEl.src) {
      var playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(function (err) {
          // If playback failed or file missing, fallback to synth ambient
          useSynthFallback = true;
          startSynthAmbient();
        });
      }
    } else {
      startSynthAmbient();
    }
  }

  function pauseMusic() {
    isPlaying = false;
    updateMusicUI();

    if (audioEl) {
      try { audioEl.pause(); } catch (e) {}
    }
    stopSynthAmbient();
  }

  function toggleMusic() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  window.WeddingMusic = {
    init: initMusic,
    play: playMusic,
    pause: pauseMusic,
    toggle: toggleMusic,
    updateUI: updateMusicUI
  };
})();
