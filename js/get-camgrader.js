// Routes "Get CamGrader" / App Store / Play Store links to the right place
// for the visitor's device, and powers the QR fallback page for desktop.
//
// CamGrader is live on both the App Store and Google Play as of Oct 2026.
var CAMGRADER_APP_STORE_URL  = 'https://apps.apple.com/app/id6770093651';
var CAMGRADER_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.k2labs.cg';

var CamGraderStore = (function () {
  'use strict';

  function detectPlatform() {
    var ua = navigator.userAgent || '';
    // iPadOS 13+ reports itself as "MacIntel" in the UA string, so a touch
    // Mac is treated as iOS too - a real desktop Mac has no touch points.
    var isIOS = /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) return 'ios';
    if (/Android/.test(ua)) return 'android';
    return 'desktop';
  }

  function storeUrlFor(platform) {
    if (platform === 'ios')     return CAMGRADER_APP_STORE_URL;
    if (platform === 'android') return CAMGRADER_PLAY_STORE_URL;
    return null;
  }

  return { detectPlatform: detectPlatform, storeUrlFor: storeUrlFor };
})();

document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelectorAll('.js-get-camgrader');
  if (!links.length) return;

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
      var platform = CamGraderStore.detectPlatform();

      if (platform === 'desktop') {
        e.preventDefault();
        window.location.href = 'get-camgrader';
        return;
      }

      var url = CamGraderStore.storeUrlFor(platform);
      if (!url) return; // no real store link yet - let the normal href (contact) carry through
      e.preventDefault();
      window.location.href = url;
    });
  }
});
