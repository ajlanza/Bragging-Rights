import React, { Component } from 'react';
// import SA from 'sweetalert2';
import AuthApiService from '../../services/auth-api-service';
import BragContext from '../BragContext';
import { Link } from 'react-router-dom';



export default class Wagers extends Component{
  static contextType = BragContext;

  selectWager(selectedWager){
    this.context.setSelectedWager({
      ...selectedWager
    })
    this.props.history.push('/bets')
  }

  handleUpdateWager(wager_id, wager_status){
    let wager = {
      wager_id,
      wager_status
    }
    AuthApiService.updateWager(wager)
      .then(() => {
        AuthApiService.getWagers(this.context.user.id)
          .then(data => {
            this.context.setWagers(data);
          })
      })
      .catch(this.context.setError)
  }

  render() {
    let { approvedWagers, needsMyApproval, awaitingOtherBettor } = this.context;
    
    return(
      <div>
      {/* If there are live wagers display them */}
      {approvedWagers.length > 0 
        ? <>
          <h3>Current Wagers</h3>
          <div className='betContainer'>
          {approvedWagers.map(bet =>
            <div key={bet.id} className='wager' onClick={() => this.selectWager(bet)}> 
            <ul>
              <li>{bet.title}</li>
              <li><img src='../date.png' alt='date icon' className='wagerIcon'/>{bet.start_date}</li>
              <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/>{bet.wager}</li>
            </ul>
            </div>
          )}
          </div></>
        : <>
          <h3>No active wagers</h3>
          <Link to='/new'><button>Create Wager</button></Link>
          </> 
      }

      {/* If there are pending wagers display a Pending Wagers header */}
      {needsMyApproval.length > 0 || awaitingOtherBettor.length > 0 
        ? <h3>Pending Wagers</h3>
        : ''
      }

      {/* If there are wagers I need to approve, display them */}
      {needsMyApproval.length > 0
        ? <div className='betContainer'>
          {needsMyApproval.map(bet => 
            <div key={bet.id} className='wager'>
              <ul>
                <li>{bet.title}</li>
                <li><img src='../date.png' alt='date icon' className='wagerIcon'/>{bet.start_date}</li>
                <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/>{bet.wager}</li>
                <li><button onClick={() => this.handleUpdateWager(bet.id, 'approved')}>Approve</button>
                    <button onClick={() => this.handleUpdateWager(bet.id, 'denied')}>Deny</button>
                </li>
              </ul>
            </div>  
          )}
          </div>
        : ''
      }

      {/* If there are wagers waiting for the other user to approve, display them */}
      {awaitingOtherBettor.length > 0
        ? <div className='betContainer'>
          {awaitingOtherBettor.map(bet => 
            <div key={bet.id} className='wager'>
              <ul>
                <li>{bet.title}</li>
                <li><img src='../date.png' alt='date icon' className='wagerIcon'/>{bet.start_date}</li>
                <li><img src='../chip32.png' alt='chip icon' className='wagerIcon'/>{bet.wager}</li>
                <li>Pending friend approval.</li>
              </ul>
            </div>  
          )}
          </div>
        : ''
      }
      </div>
    )
  }
}