// ==UserScript==
// @name         Fixed Save Button
// @namespace    https://github.com/Pcat0
// @homepageURL  https://github.com/Pcat0/Userscripts
// @version      0.1.0
// @description  Fix save button to view port
// @author       Patrick Ambli
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/Pcat0/Userscripts/master/FixedSaveButton/FixedSaveButton.user.js
// @downloadURL  https://raw.githubusercontent.com/Pcat0/Userscripts/master/FixedSaveButton/FixedSaveButton.user.js
// @supportURL   https://github.com/Pcat0/Userscripts/issues
// @match        https://*.govplatform.com/admin/self/SystemForms/Forms
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    GM_addStyle("a#save-nafcategories {position: fixed;top: 40px;right: 25px;z-index: 1;}");
})();
