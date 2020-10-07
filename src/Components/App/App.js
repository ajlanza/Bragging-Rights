import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Bets from '../Bets/Bets';
import NewBet from '../NewBet/NewBet';
import Profile from '../Profile/Profile';
import LogIn from '../LogIn/LogIn';
import Header from '../Header/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <header className="App-header">
        <Header />    
      </header>
      <main>
        <Switch>
          
          
          <Route path='/bets' component = { Bets } />
          <Route path='/new' component = { NewBet } />
          <Route path='/profile' component = { Profile } />
          <Route path='/login' component = { LogIn } />
        </Switch>
      </main>
    </div>
  );
}

export default App;
