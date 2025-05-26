import { DATA_FEED_NEW_LINE_SPEED, DATA_FEED_TYPE_SPEED } from "../../variables/constants";
import data from "./data.json";

const dataFeed = document.querySelector('.text-feed__container') as HTMLUListElement;
let currentTimestamp;

export default function createDataFeed() {
    let count = 0;
    let randomDelay = 0;

    function recursiveDataLoop() {
        console.log("timeout created")
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
        console.log(randomDelay)
    }

    recursiveDataLoop();
}

function initializeLine(dataEl: any) {
    currentTimestamp = getCurrentTime();
    const li = document.createElement('li');
    li.classList.add('glitch-wrapper');
    const timeSpan = document.createElement('span');
    timeSpan.classList.add('time-stop-data-feed');
    timeSpan.textContent = currentTimestamp;
    li.appendChild(timeSpan);

    const title = document.createElement('a');
    title.classList.add('glitch');
    li.appendChild(title);

    dataFeed.appendChild(li);
    dataFeed.scrollTop = dataFeed.scrollHeight;

    typingEffect(title, dataEl.title, 100);
}

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