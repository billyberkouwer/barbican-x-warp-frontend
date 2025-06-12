import { sizeBandLogo } from "@/helpers";
import getCurrentAct from "@/helpers/getCurrentAct";
import { EVENT_DATE } from "@/variables/constants";

const container = document.getElementById("live-now-container") as HTMLElement;
const act = document.getElementById("current-live-act") as HTMLElement;
const name = document.getElementById("current-live-act-name") as HTMLElement;
const actDescription = document.getElementById("current-live-act-description") as HTMLElement;
const performerDescription = document.getElementById("current-live-performer-description") as HTMLElement;
const location = document.getElementById("current-live-act-location") as HTMLElement;
const startTime = document.getElementById("current-live-act-start-time") as HTMLElement
const endTime = document.getElementById("current-live-act-end-time") as HTMLElement
const logo = document.getElementById("current-live-act-logo") as HTMLImageElement;
const allActs = ["act_1", "act_2", "act_3"];
const fromUntilSpans = Array.from(document.querySelectorAll(".from-until"))
const currentActContainer = document.querySelector(".current-act__container")

let previousAct: any = null;

const square = document.createElement("div")
square.classList.add("square", "green", "mobile-only-display")

function updateCurrentActInfo() {
    container.classList.add("visible");

    const currentAct = getCurrentAct();

    if (currentAct) {
        fromUntilSpans.forEach((el) => el.classList.add("visible"))
    }

    if (currentAct !== previousAct) {
        const previousTrack = document.getElementById(previousAct?.performer + "-track");
        if (previousTrack?.lastChild) {
            previousTrack?.removeChild(previousTrack?.lastChild)
        }
        previousAct = currentAct;


        const start = currentAct.startTime ? new Date(EVENT_DATE + currentAct.startTime) : null
        const end = currentAct.endTime ? new Date(EVENT_DATE + currentAct.endTime) : null;
        const inactiveActs = allActs.filter(act => act !== currentAct.act);
        inactiveActs.forEach((act) => {
            document.getElementById(act + "-block")?.classList.remove("green-bg");
        })
        const activeBlock = document.getElementById(currentAct.act + "-block")
        activeBlock?.classList.add("green-bg");
        const activeTrack = document.getElementById(currentAct.performer + "-track");
        activeTrack?.appendChild(square)

        act.textContent = currentAct.act_full ?? "";
        name.textContent = currentAct.performer ?? "";
        actDescription.textContent = currentAct.performanceDescription ?? "";
        performerDescription.textContent = currentAct.artistBio ?? "";
        location.textContent = currentAct.location ?? "";
        startTime.textContent = start?.toLocaleTimeString("it-IT").substring(0, start?.toLocaleTimeString("it-IT").length - 3) ?? "";
        endTime.textContent = end?.toLocaleTimeString("it-IT").substring(0, end?.toLocaleTimeString("it-IT").length - 3) ?? "";
        logo.style.visibility = "hidden";
        logo.src = currentAct.image ?? "";
        logo.alt = currentAct.performer;
        logo.onload = () => { sizeBandLogo(logo); logo.style.visibility = "visible" }

        currentActContainer?.classList.add("display")
    }

    if (!currentAct) {
        fromUntilSpans.forEach((el) => el.classList.remove("visible"));
        currentActContainer?.classList.remove("display")
        const previousTrack = document.getElementById(previousAct?.performer + "-track");
        if (previousTrack?.lastChild) {
            previousTrack?.removeChild(previousTrack?.lastChild)
        }
        previousAct = currentAct;

        allActs.forEach((act) => {
            document.getElementById(act + "-block")?.classList.remove("green-bg");
        })
    }
}

export default function initCurrentAct() {
    setInterval(updateCurrentActInfo, 1000)
}