// js
import initCurrentAct from "./components/CurrentAct";
import { updateDataFeed } from "./components/DataFeed";
import initTime from "./components/DateTime";
import initLiveFeed from "./components/LiveFeed";
import { initRightTerminal } from "./components/SetTimetable";
import initWeatherData from "./components/WeatherData";
import { pageSize } from "./helpers";
import mobileDOMRestructure from "./helpers/mobileDOMRestructure";

updateDataFeed()
initLiveFeed();
initWeatherData();
initTime();
initCurrentAct();
initRightTerminal();
mobileDOMRestructure();
pageSize()

console.log("Web Design: Felix Luke www.felixluke.co.uk | Web Development: Billy Myles-Berkouwer www.billyberkouwer.dev")