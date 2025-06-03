import { updateBar } from "../ProgressBar";
import json from "./set-data.json";

const progressBarsData: { id: string, startTime: Date, endTime: Date }[] = [];

function generateTableEntry(location: "conservatory" | "act_1" | "act_2" | "act_3" | "cinema", hasLocation: boolean = true) {
    const events = json[location];
    const elements = events.map((event, i) => {
        const start = new Date("2025-06-03T" + event.startTime);
        const end = new Date("2025-06-03T" + event.endTime);
        const startTimeFormatted = start.getHours() + ":" + (start.getMinutes() === 0 ? "00" : start.getMinutes());
        const endTimeFormatted = end.getHours() + ":" + (end.getMinutes() === 0 ? "00" : end.getMinutes());
        const loadingBarId = `${location}-${i}-bar`;
        progressBarsData.push({ id: loadingBarId, startTime: start, endTime: end })

        const eventName = event.act ? (//html
            `
            <div class="performer-with-act">
                <div class="uppercase act__wrapper">
                    <div class="act-inner__wrapper">
                    <span>
                        ${i === 0 ? event.act : ""}
                    </span>
                    </div>
                </div>
                <div class="green-bg">
                    ${event.performer}
                </div>
            </div>
            `
        ) : `${event.performer}`

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
                <td class="loading-bar__wrapper" colspan="10">
                    <div id="${loadingBarId}" class="green-bg"></div>
                </td>
                <td id="${loadingBarId}-text">0.0%</td>
            </tr>
        `)
    });

    return (//html
        `
        <tr class="location-table__track">
            <td colspan="1" class="uppercase">${hasLocation ? location.includes("act") ? "Hall" : location : ""}</td>
            <td colspan="100">
                <table class="nested-table">
                    <tbody>
                        ${elements.join("")}
                    </tbody>
                </table>
            </td>
        </tr>
    `);
}


const table = document.getElementById("acts-table-body");
const conservatory = generateTableEntry("conservatory");
const cinema = generateTableEntry("cinema");
const act_1 = generateTableEntry("act_1")
const act_2 = generateTableEntry("act_2", false)
const act_3 = generateTableEntry("act_3", false)

export function initSetTimesTable() {
    if (table) {
        table.innerHTML += conservatory + cinema + act_1 + act_2 + act_3;
    };
    setInterval(updateTimeElements, 1000)
};

function updateTimeElements() {
    progressBarsData.forEach((data) => {
        updateBar(data.id, data.startTime, data.endTime)
    });
}
