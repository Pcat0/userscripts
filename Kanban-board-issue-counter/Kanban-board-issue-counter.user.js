// ==UserScript==
// @name         Kanban board issue counter
// @version      0.1
// @description  Add issue counters to jira's kanban board columns.
// @author       Patrick Ambli
//
// @namespace    https://github.com/Pcat0
// @homepageURL  https://github.com/Pcat0/Userscripts
// @supportURL   https://github.com/Pcat0-SE/Userscripts/issues
//
// @run-at       document-end
// @match        https://jira.granicus.com/secure/RapidBoard.jspa?*
//
// @grant        none
// ==/UserScript==

(function(){
    new MutationObserver(function(mutationList){
        if(mutationList[0].removedNodes.length > 0){
            for (let header of document.querySelector("#ghx-column-header-group>ul").children) {
                let count = document.querySelectorAll(`li[data-column-id='${header.getAttribute("data-id")}']>div[data-issue-id]`).length;
                header.getElementsByTagName("h2")[0].innerHTML += ` (${count})`;
            }
        }
     }).observe(document.getElementsByClassName("ghx-throbber")[0], {childList: true});
})();
