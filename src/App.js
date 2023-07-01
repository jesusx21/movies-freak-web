import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Breadcrumbs, Navbar } from './components';
import {
  Films,
  Home,
  SignIn,
  SignOut,
  SignUp,
  TVSeasons,
  TVShows,
  WatchListDetail,
  WatchLists
} from './pages';

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
          <Route path='/tv-shows' exact element={<TVShows />} />
          <Route path='/tv-shows/:tvShowId' exact element={<TVSeasons />} />
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

export default App;
