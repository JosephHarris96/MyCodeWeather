import { useState } from 'react';
import React from 'react';
import './WeatherApp.css'; 
import searchImage from '../assets/search.png';
import clearImage from '../assets/clear.png';
import cloudsImage from '../assets/clouds.png';
import drizzleImage from '../assets/drizzle.png';
import humidityImage from '../assets/humidity.png'; 
import mistImage from '../assets/mist.png';
import rainImage from '../assets/rain.png';
import windImage from '../assets/wind.png';

function WeatherApp() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    let apiKey = '6e9f82648b67c804543915664b841fe2';

    const search = async () => {
        if (city === '') {
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;

        try {
            let response = await fetch(url);
            if (response.ok) {
                let data = await response.json();
                setWeatherData(data); // Update the weatherData state with the API response
                setError(null); // Clear any previous error
            } else {
                setError('API request failed.'); // Handle the API request error
            }
        } catch (error) {
            setError('Error: ' + error); // Handle other errors, e.g., network issues
        }
    }

    return (
        <div className='container'>
            <div className='topBar'>
                <input
                    type='text'
                    className='cityInput'
                    placeholder='Enter City Here'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <div className='searchIcon' onClick={() => search()}>
                    <img src={searchImage} alt='Search Icon' />
                </div>
            </div>

            <div className='cloudIcon'>
                <img src={cloudsImage} alt='Cloud Image' className='clouds' />
                <p>{weatherData ? weatherData.name : 'City Name'}</p>
            </div>

            <div className='centeredElements'>
                <div className='element'>
                    <img src={humidityImage} alt='Humidity Image' className='humidity' />
                    <div className='data'>
                        <div className='humidityPercent'>
                            {weatherData ? `${weatherData.main.humidity}%` : 'N/A'}
                        </div>
                    </div>
                </div>
                <div className='element'>
                    <img src={windImage} alt='Wind Speed Image' className='wind' />
                    <div className='data'>
                        <div className='windSpeed'>
                            {weatherData ? `${weatherData.wind.speed} km/h` : 'N/A'}
                        </div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
            {error && <div className='error'>{error}</div>}
        </div>
    );
}

export default WeatherApp;
