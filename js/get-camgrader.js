// Routes "Get CamGrader" / App Store / Play Store links to the right place
// for the visitor's device, and powers the QR fallback page for desktop.
//
// TODO: once CamGrader is live on each store, replace these two placeholder
// values with the real listing URLs (leave the quotes, just swap what's
// inside them). Until then this intentionally does nothing extra: iOS and
// Android visitors fall through to the link's normal href (the contact
// page), same as today, and desktop visitors get the QR page.
var CAMGRADER_APP_STORE_URL  = null; // e.g. 'https://apps.apple.com/app/idXXXXXXXXXX'
var CAMGRADER_PLAY_STORE_URL = null; // e.g. 'https://play.google.com/store/apps/details?id=com.camgrader.app'

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
