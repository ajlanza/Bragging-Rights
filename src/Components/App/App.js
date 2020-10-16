import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Bets from '../Bets/Bets';
import NewBet from '../NewBet/NewBet';
import Profile from '../Profile/Profile';
import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';
import Header from '../Header/Header';
import RequireAuth from '../../HOC/auth';
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
          <Route path='/bets' component = { RequireAuth(Bets) } />
          <Route path='/new' component = { RequireAuth(NewBet) } />
          <Route path='/profile' component = { RequireAuth(Profile) } />
          <Route path='/login' component = { LogIn } />
          <Route path='/signup' component = { SignUp } />
        </Switch>
      </main>
    </div>
  );
}

export default App;
