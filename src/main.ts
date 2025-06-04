// js
import initCurrentAct from "./components/CurrentAct";
import { updateDataFeed } from "./components/DataFeed";
import initTime from "./components/DateTime";
import { initRightTerminal } from "./components/SetTimetable";
import initWeatherData from "./components/WeatherData";

updateDataFeed()
initWeatherData();
initTime();
initCurrentAct();
initRightTerminal();