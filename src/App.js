import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Films from './pages/Films';
import Navbar from './components/Navbar/Navbar';
import Watchlist from './pages/Watchlist';
import Watchlists from './pages/Watchlists';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />

        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/watchlists' exact element={<Watchlists />} />
          <Route path='/watchlists/:id' exact element={<Watchlist />} />
          <Route path='/films' exact element={<Films />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
