import './App.css';
import Search from './components/search/Search'
import CurrentWeather from './components/CurrentWeather/CurrentWeather'
import { WEATHER_API_URL, WEATHER_API_KEY } from './Api';
import { useState } from 'react';
import logo from './cloud.png';
import Forecast from './components/forecast/Forecast';


function App() {

  const [currentWeather, setcurrentWeather] = useState(null);
  const [forecast, setforecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const currentForecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, currentForecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setcurrentWeather({ city: searchData.label, ...weatherResponse });
        setforecast({ city: searchData.label, ...forecastResponse });

      })
      .catch((err) => console.log(err));
    console.log(currentWeather);
    console.log(forecast);
  }
  const Footer = () => {
    return(<small className='footer'>&#169; 2023 Developed by Rukesh R.</small>)
  }
  return (
    <div className='container'>
      <img alt="app-logo" src={logo} /><h3 className='app-name'>Right Weather</h3>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      <Footer />
    </div>
  );
}

export default App;
