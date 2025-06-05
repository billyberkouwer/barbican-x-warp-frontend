// js
import initCurrentAct from "./components/CurrentAct";
import { updateDataFeed } from "./components/DataFeed";
import initTime from "./components/DateTime";
import initLiveFeed from "./components/LiveFeed";
import { initRightTerminal } from "./components/SetTimetable";
import initWeatherData from "./components/WeatherData";

updateDataFeed()
initLiveFeed();
initWeatherData();
initTime();
initCurrentAct();
initRightTerminal();