import React, { useState } from 'react';
import {UilSearch } from '@iconscout/react-unicons';

function Inputs({ handleSearch, handleClick }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
    setSearchTerm('')
  };

  const handleUnitClick = () => {
    handleClick();
  };

  return (
    <div className="flex flex-row justify-center my-10 mb-16">
      <form onSubmit={handleSubmit} className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for city...."
          className="text-xl font-serif font-normal p-1 w-full shadow-xl focus:outline-none capitalize rounded-lg"
        />
        <button type="submit" className="text-white cursor-pointer transition ease-out hover:scale-125">
          <UilSearch size={25} />
        </button>
      </form>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button onClick={handleUnitClick} name="matric" className="text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125">
          °C | °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
