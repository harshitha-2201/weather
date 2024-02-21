
const iconUrl = (iconId) =>`http://openweathermap.org/img/w/${iconId}.png`

const API_KEY = `f9ad0d563e1d98c23693e24c1ac143bf`

const weatherData = async(city , units = 'metric') =>{
    
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data)


    
    const {

        weather,
        visibility,
        main :{temp , feels_like , temp_like ,  temp_min , temp_max , pressure , humidity },
        wind : {speed},
        sys : {country},
        name,

    } = data

    const {description , icon} = weather[0]
    return{
  
        description,
        makeIconURL : iconUrl(icon )  ,
        temp,
        feels_like,
        temp_min,
        temp_max,
        visibility,
        pressure,
        humidity,
        speed,
        country,
        name,

    }
}

export {weatherData};