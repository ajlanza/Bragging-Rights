import React, { Component } from 'react';
import BragContext from '../BragContext';
import { Link } from 'react-router-dom';
import './bets.css';
import Helpers from '../../services/helpers';

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

  getFriendById(bettor1, bettor2) {
    let user = this.context.user.id;
    let needName = null;
    let friendName;
    console.log(user);
    if(bettor1 !== user){
      needName = bettor1;
      console.log('not bettor1: needname: ');
    } else if(bettor2 !== user){
      needName = bettor2;
      console.log('not bettor2, needname: ', needName);
    }
    console.log('friend: ', this.context.friends)
    this.context.friends.map(friend => 
      needName === friend.friend_id 
      ?   friendName = friend.username
      :  ''
    )
    return friendName;
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
            ? <li><img src='../date.png' alt='start date icon' className='wagerIcon'/>Start: {Helpers.processDate(selectedWager.start_date)}</li>
            : ''}
          {selectedWager.end_date
            ? <li><img src='../end.png' alt='end date icon' className='wagerIcon'/>End: {Helpers.processDate(selectedWager.end_date)}</li> 
            : ''}
          {selectedWager.bettor1 ? <li><img src='../friend.png' alt='friend icon' className='wagerIcon'/>{this.getFriendById(selectedWager.bettor1, selectedWager.bettor2)}</li> : ''}
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