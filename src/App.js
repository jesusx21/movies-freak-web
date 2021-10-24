import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar } from './components';
import { Home, Movies, Watchlists } from './pages';

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/watchlists' exact component={Watchlists} />
          <Route path='/movies' exact component={Movies} />
        </Switch>
      </Router>
    </>
  )
}

export default App
