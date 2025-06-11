import { DATA_FEED_TYPE_SPEED, EVENT_DATE } from "../../variables/constants";
import data from "./awarphappening_script.json";
const dataFeed = document.querySelector('.text-feed__body') as HTMLUListElement;
const container = document.querySelector('.terminal-left__container') as HTMLUListElement;
const scrollElement = document.querySelector(".data-feed__table") as HTMLUListElement;
let currentTimestamp;

export function updateDataFeed() {
    const now = new Date().getTime();
    const previousEntries = data.sort(function (a, b) {
        return new Date(EVENT_DATE + a.time).getTime() - new Date(EVENT_DATE + b.time).getTime();
    }).filter(entry => {
        const entryTime = new Date(EVENT_DATE + entry.time).getTime();
        return (now - entryTime > 0);
    })
    previousEntries.forEach(entry => {
        const { text, content } = initializeLine(entry);
        text.innerHTML = content;
    })
    let { nextEntry } = getNextEntry();
    setInterval(() => {
        const now = new Date().getTime();
        if (nextEntry) {
            let nextEntryTime = new Date(EVENT_DATE + nextEntry.time).getTime()
            if (now - nextEntryTime > 0) {
                const { text, content } = initializeLine(nextEntry);
                typingEffect(text, content, DATA_FEED_TYPE_SPEED)
                nextEntry = getNextEntry().nextEntry;
            }
        }
    }, 1000)
}

export function getNextEntry() {
    const now = new Date().getTime();
    const nextEntries = data.sort(function (a, b) {
        return new Date(EVENT_DATE + a.time).getTime() - new Date(EVENT_DATE + b.time).getTime();
    }).filter(entry => {
        const entryTime = new Date(EVENT_DATE + entry.time).getTime();
        return (now - entryTime < 0);
    });
    const nextEntry = nextEntries[0];
    return { nextEntry }
}

function initializeLine(dataEl: any) {
    currentTimestamp = `[${dataEl.time}]`;
    const tr = document.createElement('tr');
    tr.classList.add('glitch-wrapper');

    const squareContainer = document.createElement('td');
    const square = document.createElement('div');
    square.classList.add('terminal-square');
    squareContainer.appendChild(square);
    tr.appendChild(squareContainer)

    const timeSpan = document.createElement('td');
    timeSpan.classList.add('time-stop-data-feed');
    timeSpan.textContent = currentTimestamp;
    tr.appendChild(timeSpan);

    const colon = document.createElement('td');
    colon.textContent = ":";
    tr.appendChild(colon);

    const locationEl = document.createElement("td");
    locationEl.classList.add("terminal-location")
    locationEl.innerHTML = dataEl.zone
    tr.append(locationEl)

    const text = document.createElement('td');
    text.classList.add('glitch', "text-content");
    text.style.animationDuration = (Math.random() + 1) * 50 + "s";

    tr.appendChild(text);

    dataFeed.appendChild(tr);
    return { text, content: dataEl.content };
}

const config = { childList: true };

const callback = function (mutationsList: MutationRecord[]) {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
            scrollElement.scrollTo(0, scrollElement.scrollHeight);
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(dataFeed, config);

function typingEffect(element: HTMLElement, text: string, speed = DATA_FEED_TYPE_SPEED) {
    let i = 0;
    element.innerHTML = "";
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// ----- UNUSED

// function createDataFeed() {
//     let count = 0;
//     let randomDelay = Math.floor(Math.random() * DATA_FEED_NEW_LINE_SPEED) + 1000;

//     function recursiveDataLoop() {
//         setTimeout(() => {
//             initializeLine(data[count])
//             if (count < data.length - 1) {
//                 count++;
//             } else {
//                 count = 0;
//             }
//             randomDelay = Math.floor(Math.random() * DATA_FEED_NEW_LINE_SPEED) + 1000;
//             recursiveDataLoop();
//         }, randomDelay);
//     }
//     getLatestEntry()

//     recursiveDataLoop();
// }

// function getCurrentTime() {
//     const now = new Date();
//     const hours = now.getHours().toString().padStart(2, '0');
//     const minutes = now.getMinutes().toString().padStart(2, '0');
//     const seconds = now.getSeconds().toString().padStart(2, '0');
//     return `[${hours}:${minutes}:${seconds}]`;
// }