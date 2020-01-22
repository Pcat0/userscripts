// ==UserScript==
// @name         Jira Announcement Dismiss Button
// @description  Adds the ability to dismiss the neon yellow announcement banner on Jira.
// @author       Patrick Ambli
// @version      0.1
// @homepageURL  https://github.com/Pcat0/Userscripts
// @namespace    https://github.com/Pcat0
// @updateURL    https://raw.githubusercontent.com/Pcat0/Userscripts/master/JiraAnnouncementDismissButton/JiraAnnouncementDismissButton.user.js
// @downloadURL  https://raw.githubusercontent.com/Pcat0/Userscripts/master/JiraAnnouncementDismissButton/JiraAnnouncementDismissButton.user.js
// @supportURL   https://github.com/Pcat0/Userscripts/issues
// @match        *://jira.granicus.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const stateKey = '___AB_DISMISS_STATE___';
    var self = {
        get state() {
            return window.sessionStorage.getItem(stateKey) == 'true' || false;
        },
        set state(value) {
            window.sessionStorage.setItem(stateKey, value);
            return value;
        }
    }
    const banner = document.getElementById("announcement-banner").firstElementChild;
    banner.insertAdjacentHTML('beforeend', `<button style="float: right; visibility: visible;">X</button>`);
    const button = banner.lastElementChild;
    function setBannerState(state){
        self.state = state;
        banner.style.visibility = state ? 'hidden' : 'visible';
        button.setAttribute('title', state ? 'Show Banner': 'Dismiss Banner');
    }
    button.addEventListener('mouseup', _=>setBannerState(!self.state));
    setBannerState(self.state);
})();


