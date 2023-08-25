import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Watchlists from './pages/Watchlists';
import Films from './pages/Films';
import TVSeries from './pages/TVSeries';
import About from './pages/About';

import './style.css'

function App() {
  return (
    <>
      <Navbar />

      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/watchlists' element={<Watchlists />} />
          <Route path='/films' element={<Films />} />
          <Route path='/tv-shows' element={<TVSeries />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
