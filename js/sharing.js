/**
 * Saket ❤️ Deeksha Wedding Invitation
 * WhatsApp & Social Sharing Functionality
 * Domain: https://saketkideeksha.com
 */

(function () {
  'use strict';

  function getShareUrl() {
    var lang = (window.WeddingApp && window.WeddingApp.currentLang) || 'hi';
    var baseUrl = (window.weddingConfig && window.weddingConfig.websiteUrl) || 'https://www.saketkideeksha.in';
    return baseUrl + '/?lang=' + encodeURIComponent(lang);
  }

  function getShareMessage() {
    var lang = (window.WeddingApp && window.WeddingApp.currentLang) || 'hi';
    var t = (window.translations && window.translations[lang]) || window.translations.hi || window.translations.en;
    var domain = window.location.hostname || "saketkideeksha.in";
    return (t.sharing && t.sharing.shareMessage) || 
      "॥ श्री गणेशाय नमः ॥\n🌸 साकेत संग दीक्षा — शुभ विवाह निमंत्रण 🌸\n\n12 दिसम्बर 2026 • सप्तपदी पैलेस, हनोदा, दुर्ग\n\nनिमंत्रण पत्र देखें:\nhttps://" + domain + "/?lang=hi";
  }

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
  }

  function shareOnWhatsApp() {
    var message = getShareMessage();
    var encoded = encodeURIComponent(message);
    var url = 'https://api.whatsapp.com/send?text=' + encoded;

    if (isMobileDevice()) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  function shareNativeOrWhatsApp() {
    var message = getShareMessage();
    var targetUrl = getShareUrl();

    if (navigator.share) {
      navigator.share({
        title: 'साकेत ❤️ दीक्षा | शुभ विवाह निमंत्रण',
        text: message,
        url: targetUrl
      }).catch(function (err) {
        if (err.name !== 'AbortError') {
          shareOnWhatsApp();
        }
      });
    } else {
      shareOnWhatsApp();
    }
  }

  function copyInviteLink() {
    var targetUrl = getShareUrl();
    var lang = (window.WeddingApp && window.WeddingApp.currentLang) || 'hi';
    var t = (window.translations && window.translations[lang]) || window.translations.hi || window.translations.en;
    var copiedMsg = (t.sharing && t.sharing.linkCopied) || 'निमंत्रण लिंक कॉपी हो गया है!';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(targetUrl).then(function () {
        showShareToast(copiedMsg);
      }).catch(function () {
        fallbackCopyText(targetUrl, copiedMsg);
      });
    } else {
      fallbackCopyText(targetUrl, copiedMsg);
    }
  }

  function fallbackCopyText(text, successMsg) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showShareToast(successMsg);
    } catch (err) {
      showShareToast(text);
    }
    document.body.removeChild(textArea);
  }

  function showShareToast(message) {
    var toast = document.getElementById('share-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'share-toast';
      toast.className = 'fixed left-1/2 -translate-x-1/2 z-50 bg-[#1E1B18] text-white px-5 py-3 rounded-full text-sm font-medium shadow-2xl transition-all duration-300 transform translate-y-12 opacity-0 pointer-events-none flex items-center gap-2 border border-[#C5A059]/40';
      toast.style.bottom = 'max(24px, calc(16px + env(safe-area-inset-bottom, 16px)))';
      document.body.appendChild(toast);
    }

    toast.innerHTML = '<span>❤️</span> <span>' + message + '</span>';
    toast.classList.remove('translate-y-12', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(function () {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-12', 'opacity-0', 'pointer-events-none');
    }, 3200);
  }

  function initSharing() {
    var whatsappBtn = document.getElementById('share-whatsapp-btn');
    var copyBtn = document.getElementById('share-copy-btn');
    var genericShareBtn = document.getElementById('share-invite-btn');

    if (whatsappBtn) whatsappBtn.addEventListener('click', shareOnWhatsApp);
    if (copyBtn) copyBtn.addEventListener('click', copyInviteLink);
    if (genericShareBtn) genericShareBtn.addEventListener('click', shareNativeOrWhatsApp);
  }

  window.WeddingSharing = {
    init: initSharing,
    shareWhatsApp: shareOnWhatsApp,
    copyLink: copyInviteLink,
    shareNative: shareNativeOrWhatsApp
  };
})();
