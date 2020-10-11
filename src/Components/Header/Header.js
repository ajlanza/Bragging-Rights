import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
    render() {
    
        return(
          <div>
            <img src='../chip256.png' alt='logo' className='logo'/>
            <h1>Bragging Rights</h1> 
            <p>Keep track of your friendly bets with friends by using Bragging Rights. Simply add your friends to
              your account and set up wagers with them.</p>
          </div>
        )
      }
}