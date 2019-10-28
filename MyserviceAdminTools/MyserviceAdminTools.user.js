// ==UserScript==
// @name         Myservice Admin Tools -beta
// @namespace    https://github.com/Pcat0
// @homepageURL  https://github.com/Pcat0/Userscripts
// @version      0.2.0
// @description  Adding features to the Myservice Admin, that really should already exist.
// @author       Patrick Ambli
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/Pcat0/Userscripts/beta/MyserviceAdminTools/MyserviceAdminTools.user.js
// @downloadURL  https://raw.githubusercontent.com/Pcat0/Userscripts/beta/MyserviceAdminTools/MyserviceAdminTools.user.js
// @supportURL   https://github.com/Pcat0-SE/Userscripts/issues
// @match        *://*.govplatform.com/admin/MyServices/service/edit/*
// @grant        GM_addStyle
// ==/UserScript==


(function () {
    //TODO: change to be single target
    const addCopyButtons = [].forEach.bind(document.getElementsByClassName("uri-search"), function (inputEl) {
        var div = document.createElement("div");
        div.setAttribute("style", "position: absolute; display: flex; align-items: center; justify-content: center; top: 0px; right: 15px; height: 100%;");
        div.setAttribute("title", "Use process ID from last version");

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.innerHTML = '<g transform="matrix(.99829 0 0 .99829 -101.01 -353.4)" fill-opacity="0.2"><path d="m134.94 354c-3.324 0-6 2.676-6 6v96c0 3.324 2.676 6 6 6h82c3.324 0 6-2.676 6-6v-62h-40c-3.324 0-6-2.676-6-6v-34h-42z"></path><path d="m113.66 374.22c-3.324 0-6 2.676-6 6v96c0 3.324 2.676 6 6 6h82c3.324 0 6-2.676 6-6v-7h-73c-3.324 0-6-2.676-6-6v-89h-9z"></path><path d="m180.94 354v30c0 3.324 2.676 6 6 6h36z"></path></g>';
        svg.setAttribute("viewBox", "0 0 128 128");
        svg.setAttribute("style", "float:right; margin: 15%; height: 70%; cursor: pointer");
        svg.addEventListener("click", _=>{
            inputEl.value = {"service-select": oldUserProcess.processID, "admin-select": oldAdminProcess.processID}[inputEl.getAttribute("data-select-id")];
            inputEl.dispatchEvent(new Event('change'));
        });

        div.appendChild(svg);

        inputEl.parentElement.appendChild(div);
    });
    const addVersionListEnhancement = function(listElement, categoryID, oldProcess, currentProcess) {
        var observer = new MutationObserver(function (mutationsList) {
            this.disconnect();
            var autoOption = `<option value="-1" data-uri="sandbox-shared://${oldProcess.processID}/${oldProcess.stageID}/definition.json" category-id="${categoryID}" ${oldProcess.version==-1?'current-version':''}>Auto update (use only for testing)</option>`;
            listElement.firstElementChild.insertAdjacentHTML('afterend', autoOption);
            if(currentProcess.processID == oldProcess.processID){
                for (let mutation of mutationsList) {
                    if(mutation.addedNodes.length === 1 && mutation.addedNodes[0].value == oldProcess.version) {
                        mutation.addedNodes[0].setAttribute("current-version", "");
                    }
                }
            }
            this.observe(listElement, {childList: true});
        });
        observer.observe(listElement, {childList: true});
    }
    const URIParser = function(URI){
        var out = URI.match(/(?<processID>AF-Process(?:-?[a-z0-9]{4}){8})(?:\/versions\/(?<version>\d+))?\/(?<stageID>AF-Stage(?:-?[a-z0-9]{4}){8})/).groups;
        out.version = +(out.version || -1);
        return out;
    }
    const elementValueGetter = obj => new Proxy(obj, {
        get: (obj, key) => document.querySelector(obj[key]).value
    });

    const fieldUserURI = document.getElementsByName("service_uri")[0];
    const fieldAdminURI = document.getElementsByName("service_admin_uri")[0];
    const fieldUserVersion = document.getElementById("service-select");
    const fieldAdminVersion = document.getElementById("admin-select");

    var oldUserProcess  = URIParser(fieldUserURI.value);
    var oldAdminProcess = URIParser(fieldAdminURI.value);
    var oldCategoryID   = document.getElementsByName("category_id")[0].value;

    var currentUserProcess  = elementValueGetter({processID: "input[data-select-id=service-select]", version: "#service-select"});
    var currentAdminProcess = elementValueGetter({processID: "input[data-select-id=admin-select]", version: "#admin-select"});

    GM_addStyle("option[current-version]{font-weight: bold}");

    addCopyButtons();
    addVersionListEnhancement(fieldUserVersion,  oldCategoryID, oldUserProcess,  currentUserProcess);
    addVersionListEnhancement(fieldAdminVersion, oldCategoryID, oldAdminProcess, currentAdminProcess);
})();
