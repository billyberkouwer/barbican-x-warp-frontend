import { OFFSET_TIME } from "@/variables/constants";

export function getCurrentTime() {
    const now = new Date(new Date().getTime() + OFFSET_TIME).toLocaleTimeString("it-IT");

    return `${now}`;
}

export function getCurrentDate() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    return `${day}.${month}.${year}`;
}

const time = document.getElementById("current-time") as HTMLElement;
const date = document.getElementById("current-date") as HTMLElement;

export default function initTime() {
    time.textContent = getCurrentTime();
    date.textContent = getCurrentDate();

    setInterval(() => {
        time.textContent = getCurrentTime();
    }, 1000)
}
