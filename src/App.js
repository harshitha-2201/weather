import React from 'react';
import './App.css';
import WetherDetails from './components/WetherDetails'

function App() {
  return (
    <div className='mx-auto max-w-screen-md  mt-3 py-5 px-32 bg-gradient-to-b from-cyan-400 to-purple-700 h-fit shadow-xl shadow-gray-400'>
      <WetherDetails/>
    </div>
  );
}

export default App;
