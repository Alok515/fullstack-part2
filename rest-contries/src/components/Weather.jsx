import { getData } from "../API"
import { useEffect, useState } from "react"

const Weather = ({city}) => {
    const [ weather, setWeather ] = useState('');

    useEffect(() => {
        const fetchWeather = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`
            const data = await getData(url);
            setWeather(data);
        }
        fetchWeather();
    }, [city])

    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>Temperature: { weather?.main?.temp ? (weather?.main?.temp - 273).toFixed(2) : 0 } Celcius</p>
            { weather && <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} /> }
            <p>wind: {weather?.wind?.speed || 0} m/s</p>
        </div>
    )
}

export default Weather