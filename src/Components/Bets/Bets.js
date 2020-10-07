import React, { Component } from 'react';
import data from '../../Assets/data';
import BragContext from '../BragContext';
import './bets.css';

export default class Bets extends Component {
  static contextType = BragContext;

  componentDidMount() {
    let user = data.bettors[1];
    let friends = data.bettors[1].friends;
    let wagers = data.wagers;
    this.context.clearError();
    this.context.setUser(user);
    this.context.setWagers(wagers);
    this.context.setFriends(friends);
  }

  selectWager(selectedWager){
    this.context.setSelectedWager({
      ...selectedWager
    })
  }

  render() {
    const { wagers, selectedWager } = this.context;
    
    return(
      <div className='bets'>    

        {this.context.selectedWager.length === 0
        ?
        <ul className='selected-bet'>
        <h2>No wager selected</h2>
          <li>Please choose a wager to view details</li>
        </ul> 
        :  
        <ul className='selected-bet'>
        <h2>{selectedWager.betName}</h2>
          <li><img src='../beans.png' alt='coffee beans icon' className='wagerIcon'/>{selectedWager.wager}</li>
          {(selectedWager.startDate && selectedWager.endDate) ? <li><img src='../date.png' alt='date icon' className='wagerIcon'/>{selectedWager.startDate} to {selectedWager.endDate}</li> : ''}
          {selectedWager.bettors ? <li><img src='../friend.png' alt='friend icon' className='wagerIcon'/>{selectedWager.bettors.join(', ')}</li> : ''}
        </ul>
        }

        <h2><br/></h2>
        <ul className='bets-container'>
          <ul className='each-bet'>
            <a href='/new'><li>Select to place a new wager.</li></a>
          </ul>
          {wagers.map(wager => 
            <ul className='each-bet' onClick={() => this.selectWager(wager)} key={wager._id}>
              <li>{wager.betName}</li>
              <li>Started: {wager.startDate}</li>
              <li>At stake: {wager.wager}</li>
            </ul>
          )}
        </ul>
      </div>
    );
  }
}