import { DATA_FEED_NEW_LINE_SPEED, DATA_FEED_TYPE_SPEED } from "../../variables/constants";
import data from "./data.json";

const dataFeed = document.querySelector('.text-feed__body') as HTMLUListElement;
const container = document.querySelector('.text-feed__container') as HTMLUListElement;
let currentTimestamp;

export default function createDataFeed() {
    let count = 0;
    let randomDelay = Math.floor(Math.random() * DATA_FEED_NEW_LINE_SPEED) + 1000;

    function recursiveDataLoop() {
        setTimeout(() => {
            initializeLine(data[count])
            if (count < data.length - 1) {
                count++;
            } else {
                count = 0;
            }
            randomDelay = Math.floor(Math.random() * DATA_FEED_NEW_LINE_SPEED) + 1000;
            recursiveDataLoop();
        }, randomDelay);
    }

    recursiveDataLoop();
}

function initializeLine(dataEl: any) {
    currentTimestamp = getCurrentTime();
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
    locationEl.innerHTML = dataEl.location
    tr.append(locationEl)

    const text = document.createElement('td');
    text.classList.add('glitch', "text-content");
    tr.appendChild(text);

    dataFeed.appendChild(tr);
    typingEffect(text, dataEl.title, DATA_FEED_TYPE_SPEED);
}

const config = { childList: true };

const callback = function (mutationsList: MutationRecord[]) {
    console.log("firing")
    for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
            container.scrollTo(0, container.scrollHeight);
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(dataFeed, config);

// TYPE OUT THE JSON DATA BY ADDING CHAR BY CHAR 
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

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `[${hours}:${minutes}:${seconds}]`;
}