import { EVENT_DATE } from "@/variables/constants";
import { createLoadingBar, updateBar } from "../ProgressBar";
import json from "./set-timetable-data.json";
import eventData from "./event-data.json";

const progressBarsData: { id: string, startTime: Date, endTime: Date }[] = [];

function generateTableEntry(location: "conservatory" | "act_1" | "act_2" | "act_3" | "cinema", hasLocation: boolean = true) {
    const events = json[location];
    const elements = events.map((event, i) => {
        const start = new Date(EVENT_DATE + event.startTime);
        const end = new Date(EVENT_DATE + event.endTime);
        const startTimeFormatted = start.getHours() + ":" + (start.getMinutes() === 0 ? "00" : start.getMinutes());
        const endTimeFormatted = end.getHours() + ":" + (end.getMinutes() === 0 ? "00" : end.getMinutes());
        const loadingBarId = `${location}-${i}-bar`;
        progressBarsData.push({ id: loadingBarId, startTime: start, endTime: end })

        const eventName = event.act ? (//html
            `
            <div class="performer-with-act ${location}-type">
                <div></div>
                <div class="green-bg">
                    ${event.performer}
                </div>
            </div>
            `//
        ) : `${event.performer}`//

        return (//html
            `    
            <tr class="event-track">
                <td class="event-name ${event.act ? "" : "green-bg"}">
                    ${eventName}
                </td>
                <td>:</td>
                <td>${startTimeFormatted}</td>
                <td>—</td>
                <td>${endTimeFormatted}</td>
                ${createLoadingBar(loadingBarId, "loading-bar__wrapper")}
                <td id="${loadingBarId}-text">0.0%</td>
            </tr>
        `//
        )
    });

    return (//html
        `
        <tr class="location-table__track">
            <td colspan="1" class="uppercase">${hasLocation ? location.includes("act") ? "Hall" : location : ""}</td>
            <td colspan="100">
                <table class="nested-table">
                    <tbody>
                            ${location.includes("act") ? (//html
            `
                                    <div class= "act__wrapper uppercase" id="${json[location][0]?.act}-block" >
                                        ${location === "act_1" ? "I&nbsp;&nbsp; SETUP" : location === "act_2" ? "II &nbsp;&nbsp;CONFRONTATION" : location === "act_3" ? "III &nbsp;&nbsp;RESOLUTION" : ""}
                                    </div>
                                `//
        ) : ""
        }
                        ${elements.join("")}
                    </tbody>
                </table>
            </td>
        </tr>`//
    );
}


const table = document.getElementById("acts-table-body");
const eventProgressBarWrapper = document.getElementById("event-progress-bar-wrapper")
const conservatory = generateTableEntry("conservatory");
const cinema = generateTableEntry("cinema");
const act_1 = generateTableEntry("act_1")
const act_2 = generateTableEntry("act_2", false)
const act_3 = generateTableEntry("act_3", false)

export function createEventProgressBar() {
    const text = (//html
        `<span class="event-progress-text">Event Progress: <span class="event-progress-text" id="event-progress-bar-text"></span></span>`//
    );

    if (eventProgressBarWrapper) {
        eventProgressBarWrapper.innerHTML = text + createLoadingBar("event-progress-bar", "")
    }
}

export function initSetTimesTable() {
    if (table) {
        table.innerHTML += conservatory + cinema + act_1 + act_2 + act_3;
    };
};

export function initRightTerminal() {
    initSetTimesTable();
    createEventProgressBar();
    setInterval(updateTimeElements, 1000)
}

function updateTimeElements() {
    progressBarsData.forEach((data) => {
        updateBar(data.id, data.startTime, data.endTime)
    });
    updateBar("event-progress-bar", new Date(EVENT_DATE + eventData.event_info.startTime), new Date(EVENT_DATE + eventData.event_info.endTime))
}
