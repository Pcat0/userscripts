// ==UserScript==
// @name         Kanban board issue counter
// @version      1.0.2
// @description  Add issue counters to jira's kanban board columns.
// @author       Patrick Ambli
//
// @namespace    https://github.com/Pcat0
// @homepageURL  https://github.com/Pcat0/Userscripts
// @supportURL   https://github.com/Pcat0/Userscripts/issues
// @updateURL    https://raw.githubusercontent.com/Pcat0/Userscripts/master/KanbanBoardIssueCounter/KanbanBoardIssueCounter.user.js
// @downloadURL  https://raw.githubusercontent.com/Pcat0/Userscripts/master/KanbanBoardIssueCounter/KanbanBoardIssueCounter.user.js
//
// @run-at       document-end
// @match        https://jira.granicus.com/secure/RapidBoard.jspa?*
//
// @grant        none
// ==/UserScript==

(function() {
    const TIME_UNITS = {
        'w': 2400,
        'd': 480,
        'h': 60,
        'm': 1,
    }

    //No longer need as of Jira ~8.5.4
    /*function updateUiOffset() {
        var offset = document.getElementById('ghx-column-header-group').offsetHeight;
        document.getElementById('ghx-pool').style.paddingTop = `${offset}px`;
    }*/
    function parseTimeStr(timeStr) {
        return timeStr.split(" ").reduce((acc, cur) => acc + TIME_UNITS[cur.slice(-1)] * cur.slice(0, -1), 0) || 0;
    }
    function formatTime(minutes, units, maxUnits = Infinity, decimalStep = .25) {
        var output = [];
        for (const unit of units) {
            let quotient = minutes / TIME_UNITS[unit];
            if (!Number.isInteger(quotient / decimalStep)){ // Check if number is a multiple of [decimalStep]
                if(output.length + 1 >= maxUnits || units[units.length-1] == unit) { // Check if this is the last unit
                    quotient = (Math.round(quotient / decimalStep) * decimalStep); //round to the nearest [decimalStep]
                } else {
                    quotient |= 0; //floor quotient
                }
            }
            if(quotient > 0){
                minutes -= quotient * TIME_UNITS[unit];
                if (output.push(`${quotient}${unit}`) >= maxUnits){
                    break;
                }
            }
        }

        return output.join(' ');
    }
    AJS.$(GH).bind('workModeUIReady', function() { //Hijack the GreenHopper event system to know when the kanban board has been refeshed.
        console.log(`WorkModeUIReady`);
        for (let header of document.querySelector("#ghx-column-header-group>ul").children) {
            let column = document.querySelectorAll(`li[data-column-id='${header.getAttribute("data-id")}']>div[data-issue-id]`);
            let totalTimeLeft = 0;
            for (let issue of column) {
                let timeLeftStr = issue.querySelector(".ghx-corner aui-badge").innerText;
                totalTimeLeft += parseTimeStr(timeLeftStr);
            }
            header.querySelector('.ghx-column-header-content').innerHTML += `<aui-badge style="" title='Remaining Time Estimate'>${formatTime(totalTimeLeft, ['d', 'h', 'm'], 2)}</aui-badge>`;
            header.innerHTML += `<span style="margin-top: 5px; border-width: 1px; background-color: transparent;" class="aui-lozenge aui-lozenge-subtle" title="Total number of tickets">${column.length} Ticket${column.length != 1 ? 's' : ''}</span>`;
        }
        //Uppdate kanban board offset to fix any header overflow.
        //updateUIOffset();
    });
})();
