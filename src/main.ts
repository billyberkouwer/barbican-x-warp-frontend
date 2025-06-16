// js
import initCurrentAct from "./components/CurrentAct";
import { updateDataFeed } from "./components/DataFeed";
import initTime from "./components/DateTime";
import initLiveFeed from "./components/LiveFeed";
import { initRightTerminal } from "./components/SetTimetable";
import initWeatherData from "./components/WeatherData";
import { pageSize } from "./helpers";
import mobileDOMRestructure from "./helpers/mobileDOMRestructure";
import { setOffset } from "./variables/constants";

const setbutton = document.getElementById("set-button")
const setbuttonval = document.getElementById("set-button-value") as HTMLInputElement;
const form = document.getElementById("form")

let isDisplayed = false;

document.addEventListener("keypress", (e) => {
    console.log(e.key)
    if (e.key === "h") {
        isDisplayed = !isDisplayed;

        if (form) {
            form.style.display = isDisplayed ? "block" : "none"
        }
    }
})

if (setbutton)
    setbutton.onclick = async (e) => {
        e.preventDefault()
        // if (setbuttonval)
        setOffset(Number(setbuttonval?.value));

        updateDataFeed()
        await initLiveFeed();
        // initWeatherData();
        initTime();
        initCurrentAct();
        // initRightTerminal();
        // mobileDOMRestructure();
        pageSize()
    }


updateDataFeed()
initLiveFeed();
initWeatherData();
initTime();
initCurrentAct();
initRightTerminal();
mobileDOMRestructure();
pageSize()


console.log("Web Design: Felix Luke www.felixluke.co.uk | Web Development: Billy Myles-Berkouwer www.billyberkouwer.dev")