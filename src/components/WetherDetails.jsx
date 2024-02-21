import React, { useEffect, useState } from 'react';
import {  UilWater, UilArrowCompressH, UilWind, UilEye } from '@iconscout/react-unicons';
import { weatherData } from './WeatherServices';
import Inputs from './Inputs';

const WeatherDetails = () => {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [city, setCity] = useState('Paris');
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const datas = await weatherData(city, units);
        setWeather(datas);
        setError('');
      } catch (error) {
        setError('Error fetching weather data. Please try again.');
      }
    };

    fetchWeatherData();
  }, [units, city]);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (searchTerm) => {
    setCity(searchTerm);
  };

  const handleClick = () => {
    setUnits((prevUnits) => (prevUnits === 'metric' ? 'imperial' : 'metric'));
  };

  const cardsData = [
    { icon: <UilEye size={30} className="text-white cursor-pointer transition ease-out hover:scale-125" />, value: weather?.visibility, label: 'Visibility' },
    { icon: <UilWind size={30} className="text-white cursor-pointer transition ease-out hover:scale-125 m-2.5" />, value: weather?.speed, label: 'Wind' },
    { icon: <UilArrowCompressH size={30} className="text-white cursor-pointer transition ease-out hover:scale-125" />, value: weather?.pressure, label: 'Pressure' },
    { icon: <UilWater size={30} className="text-white cursor-pointer transition ease-out hover:scale-125" />, value: weather?.humidity, label: 'Humidity' }
  ];

  return (
    <>
      <Inputs handleSearch={handleSearch} handleClick={handleClick} />
      {error && <p className="text-red-500 justify-center items-center flex text-xl">{error}</p>}
      {weather && currentDateTime && (
        <div>
          <div className='flex items-center justify-center my-6 mb-8'>
            <p className='text-white text-xl font-extralight'>
              {currentDateTime.toLocaleString()}
            </p>
          </div>
          <div className='flex items-center justify-center my-3 mb-8'>
            <p className='text-white text-3xl font-medium'>
              {`${weather.name} , ${weather.country}`}
            </p>
          </div>
          <div className='flex flex-row justify-between items-center my-6 mb-15'>
            <div className='flex flex-row items-center'>
               <p className='text-white text-xl font-bold  '>{`${weather.temp.toFixed()} ° ${units === 'metric' ? "C" : "F"} `}</p>
               <p className='text-xl text-white mx-3'>||</p>
               <p className="text-white text-xl font-semibold">{weather.description}</p>
              </div>
              <div className='flex flex-row items-center justify-end'>
                <img src={weather.makeIconURL} alt='weatherurl' className="text-white  min-h-28  " />
             </div>
          </div>

          <div className='flex flex-col justify-center items-center my-6 '>
            {/* Top left and right cards */}
            <div className="flex flex-row justify-center w-full mb-6 ">
              <div className='flex flex-col justify-center items-center p-3'>
                {cardsData.slice(0, 2).map((card, index) => (
                  <div key={index} className='flex flex-row justify-center items-center text-white border-solid border-gray-400 border-2 rounded-lg p-5 mb-4'>
                    <div className='m-2 hover:scale-125 translate '>
                      {card.icon}
                    </div>
                    <div className='m-2'>
                      <p>{card.value}</p>
                      <h3>{card.label}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex flex-col justify-start items-center p-3'>
                {cardsData.slice(2, 4).map((card, index) => (
                  <div key={index} className='flex flex-row justify-center items-center text-white border-solid border-gray-400 border-2 rounded-lg p-5 mb-4'>
                    <div className='m-2 hover:scale-125 translate '>
                      {card.icon}
                    </div>
                    <div className='m-2'>
                      <p>{card.value}</p>
                      <h3>{card.label}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherDetails;
