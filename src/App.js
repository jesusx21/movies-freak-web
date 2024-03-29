import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lists from './pages/Lists';
import Films from './pages/Films';

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/lists' exact component={Lists} />
          <Route path='/films' exact component={Films} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
