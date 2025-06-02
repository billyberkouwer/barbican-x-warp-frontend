// js
import createDataFeed from "./components/DataFeed";
import initTime from "./components/DateTime";
import initLiveFeed from "./components/LiveFeed";
import initWeatherData from "./components/WeatherData";

initLiveFeed();
createDataFeed();
initWeatherData();
initTime();