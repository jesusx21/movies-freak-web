import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Films, Home, WatchListDetail, WatchLists } from './pages';
import { Breadcrumbs, Navbar } from './components';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Breadcrumbs />
        <ToastContainer />

        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/watch-lists' exact element={<WatchLists />} />
          <Route path='/watch-lists/:id' exact element={<WatchListDetail />} />
          <Route path='/films' exact element={<Films />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
