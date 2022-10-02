import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './pages/Home';
import Watchlists from './pages/Watchlists';
import Films from './pages/Films';
import TVShows from './pages/TVShows';
import About from './pages/About';

function App() {
  return (
    <>
      <Navbar />

      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/watchlists' element={<Watchlists />} />
          <Route path='/films' element={<Films />} />
          <Route path='/tv-shows' element={<TVShows />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </>
  );
}

// function App() {
//   let Component;

//   switch (window.location.pathname) {
//     case '/':
//       Component = Home;
//       break;
//       case '/watchlists':
//         Component = Watchlists;
//         break;
//       case '/films':
//         Component = Films;
//         break;
//       case '/about':
//     default:
//       Component = About
//       break;
//   }

//   return (
//     <>
//       <Navbar />
//       <div className='container'>
//         <Component />
//       </div>
//     </>
//   );
// }

export default App;
