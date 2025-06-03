// js
import initCurrentAct from "./components/CurrentAct";
import createDataFeed from "./components/DataFeed";
import initTime from "./components/DateTime";
import initLiveFeed from "./components/LiveFeed";
import { initSetTimesTable } from "./components/SetTimetable";
import initWeatherData from "./components/WeatherData";

initLiveFeed();
createDataFeed();
initWeatherData();
initTime();
initCurrentAct();
initSetTimesTable();