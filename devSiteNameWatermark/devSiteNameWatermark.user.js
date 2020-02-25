// ==UserScript==
// @name         Dev Site Name Watermark
// @namespace    https://github.com/Pcat0
// @homepageURL  https://github.com/Pcat0/Userscripts
// @version      0.1.2
// @description  Adds a site name watermark to the Dev sites. This allows for more easy ideation for what site one is working on.
// @author       Patrick Ambli
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/Pcat0/Userscripts/master/devSiteNameWatermark/devSiteNameWatermark.user.js
// @downloadURL  https://raw.githubusercontent.com/Pcat0/Userscripts/master/devSiteNameWatermark/devSiteNameWatermark.user
// @supportURL   https://github.com/Pcat0/Userscripts/issues
// @match        *://*.govplatform.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    var {siteName} = window.location.hostname.match(/^[^.]+\.(?<siteName>[^.]+)\./).groups;
    document.body.insertAdjacentHTML('afterbegin', `<div style="opacity: 0.3; font-size: 200px; position: fixed; right: 0px; bottom: 0px; pointer-events: none; font-family: Arial, 'Open Sans', sans-serif; z-index: 9999999; ">${siteName}</div>`)
    // Your code here...
})();
