import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Films, Home, SignUp, WatchListDetail, WatchLists } from './pages';
import { Breadcrumbs, Navbar } from './components';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Breadcrumbs />
        <ToastContainer />

        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/films' exact element={<Films />} />
          <Route path='/sign-in' exact element={<SignIn />} />
          <Route path='/sign-out' exact element={<SignOut />} />
          <Route path='/sign-up' exact element={<SignUp />} />
          <Route path='/watch-lists' exact element={<WatchLists />} />
          <Route path='/watch-lists/:id' exact element={<WatchListDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
