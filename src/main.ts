// js
import initCurrentAct from "./components/CurrentAct";
import { clearDataFeed, updateDataFeed } from "./components/DataFeed";
import initTime from "./components/DateTime";
import initLiveFeed from "./components/LiveFeed";
import { initRightTerminal } from "./components/SetTimetable";
import initWeatherData from "./components/WeatherData";
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

let dataFeedInterval = updateDataFeed()
initLiveFeed();
initWeatherData();
let timeInterval = initTime();
let currentActInterval = initCurrentAct();
initRightTerminal();
mobileDOMRestructure();
// pageSize()

if (setbutton)
    setbutton.onclick = async (e) => {
        e.preventDefault()

        setOffset(Number(setbuttonval?.value));

        clearInterval(dataFeedInterval)
        clearDataFeed()
        dataFeedInterval = updateDataFeed()

        clearInterval(timeInterval)
        timeInterval = initTime();

        clearInterval(currentActInterval)
        currentActInterval = initCurrentAct();
    }





console.log("Web Design: Felix Luke www.felixluke.co.uk | Web Development: Billy Myles-Berkouwer www.billyberkouwer.dev")