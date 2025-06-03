// js
import createDataFeed from "./components/DataFeed";
import initTime from "./components/DateTime";
import initLiveFeed from "./components/LiveFeed";
// import initLoadingBar from "./components/ProgressBar";
import { initSetTimesTable } from "./components/SetTimetable";
import initWeatherData from "./components/WeatherData";

initLiveFeed();
createDataFeed();
initWeatherData();
initTime();
// initLoadingBar();
initSetTimesTable();