// ==UserScript==
// @name         Myservice Admin Tools
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adding features to the Myservice Admin, that really should already exist.
// @author       Patrick Ambli
// @run-at       document-idle
// @match        https://myservices-self.dev.govplatform.com/admin/MyServices/service/edit/*
// @grant        none
// ==/UserScript==
(function(){
    const URIDecoder = /(?<id>AF-Process(?:-?[a-z0-9]{4}){8})\/versions\/(?<version>\d+)/;
    var userURI = document.getElementsByName("service_uri")[0].value;
    var adminURI = document.getElementsByName("service_admin_uri")[0].value;

    var {id: userProcessID, version: userVersion} = userURI.match(URIDecoder).groups;
    var {id: adminProcessID, version: adminVersion} = adminURI.match(URIDecoder).groups;

    userVersion = +userVersion;
    adminVersion = +adminVersion;
    [].forEach.call(document.getElementsByClassName("uri-search"), function(inputEl){
        var div = document.createElement("div");
        div.setAttribute("style", "position: absolute; display: flex; align-items: center; justify-content: center; top: 0px; right: 15px; height: 100%;");
        div.setAttribute("title", "Use process ID from last version");

        var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.innerHTML = '<g transform="matrix(.99829 0 0 .99829 -101.01 -353.4)" fill-opacity="0.2"><path d="m134.94 354c-3.324 0-6 2.676-6 6v96c0 3.324 2.676 6 6 6h82c3.324 0 6-2.676 6-6v-62h-40c-3.324 0-6-2.676-6-6v-34h-42z"></path><path d="m113.66 374.22c-3.324 0-6 2.676-6 6v96c0 3.324 2.676 6 6 6h82c3.324 0 6-2.676 6-6v-7h-73c-3.324 0-6-2.676-6-6v-89h-9z"></path><path d="m180.94 354v30c0 3.324 2.676 6 6 6h36z"></path></g>';
        svg.setAttribute("viewBox", "0 0 128 128");
        svg.setAttribute("style", "float:right; margin: 15%; height: 70%; cursor: pointer");

        div.appendChild(svg);

        svg.addEventListener("click", ()=>{
            inputEl.value={"service-select": userProcessID, "admin-select": adminProcessID}[inputEl.getAttribute("data-select-id")];
            inputEl.dispatchEvent(new Event('change'));
        });

        inputEl.parentElement.appendChild(div);
    });
})();
