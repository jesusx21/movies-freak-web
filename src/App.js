import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lists from './pages/Lists';
import Movies from './pages/Movies';
import FilmsOnList from './pages/FilmsOnList';

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/lists' exact component={Lists} />
          <Route path='/lists/:listId' exact component={FilmsOnList} />
          <Route path='/films' exact component={Movies} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
