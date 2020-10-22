import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
    render() {
    
        return(
          <div className='header'>
            <h1>Bragging Rights</h1> 
            <div className='hero'></div>
            <p>Keep track of your friendly bets with friends by using Bragging Rights. Simply add your friends to
              your account and set up wagers with them.</p>
          </div>
        )
      }
}