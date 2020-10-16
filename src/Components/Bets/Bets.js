import React, { Component } from 'react';
import BragContext from '../BragContext';
import { Link } from 'react-router-dom';
import './bets.css';

export default class Bets extends Component {
  static contextType = BragContext;

  componentDidMount() {
    this.context.clearError();
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
        <h2>{selectedWager.title}</h2>
          <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/>{selectedWager.wager}</li>
          {selectedWager.start_date 
            ? <li><img src='../date.png' alt='date icon' className='wagerIcon'/>Start: {selectedWager.start_date}</li>
            : ''}
          {selectedWager.end_date
            ? <li><img src='../date.png' alt='date icon' className='wagerIcon'/>End: {selectedWager.end_date}</li> 
            : ''}
          {selectedWager.bettors ? <li><img src='../friend.png' alt='friend icon' className='wagerIcon'/>{selectedWager.bettors.join(', ')}</li> : ''}
        </ul>
        }

        <h2><br/></h2>
        <ul className='bets-container'>
          <ul className='each-bet'>
            <Link to='/new'><li>Create new wager.</li></Link>
          </ul>
          {wagers.map(wager => 
            <ul className='each-bet' onClick={() => this.selectWager(wager)} key={wager.id}>
              <li>{wager.betName}</li>
              <li>Started: {wager.start_date}</li>
              <li>At stake: {wager.wager}</li>
            </ul>
          )}
        </ul>
      </div>
    );
  }
}