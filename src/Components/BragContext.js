import React, { Component } from 'react';

const BragContext = React.createContext({
  user: {
    id: null,
    username: null,
    avatar: 'club.png',
  },
  friends: [{
    friend_id: null,
    username: null,
    avatar: null,
    pending: null,
    approved: null,
  }],
  wagers: [{
    id: null,
    title: null,
    start_date: null,
    end_date: null,
  }],
  approvedWagers: [],
  needsMyApproval: [],
  awaitingOtherBettor: [],
  approvedFriends: [],
  pendingFriends: [],
  awaitingFriends: [],
  selectedWager: [],
  error: null,
  authorized: null,

  clearAll: () => {},
  setWagers: () => {},
  setSelectedWager: () => {},
  hideSelectedWager: () => {},
  setFriends: () => {},
  setUser: () => {},
  setAuthorized: () => {},
  setError: () => {},
  clearError: () => {},
})
export default BragContext

export class BragContextProvider extends Component {
  state = {
    user: {
      id: null,
      username: null,
      avatar: 'club.png'
    },
    friends: [],
    wagers: [],
    approvedWagers: [],
    needsMyApproval: [],
    awaitingOtherBettor: [],
    approvedFriends: [],
    pendingFriends: [],
    awaitingFriends: [],
    selectedWager: [],
    error: null,
    authorized: false,
  };

  clearAll = () => {
    this.setState ({
      user: {},
      friends: [],
      approvedFriends: [],
      pendingFriends: [],
      awaitingFriends: [],
      wagers: [],
      approvedWagers: [],
      needsMyApproval: [],
      awaitingOtherBettor: [],
      selectedWager: [],
      authorized: false
    })
  }

  setWagers = wagers => {
    let approvedWagers = [];
    let needsMyApproval = [];
    let awaitingOtherBettor = [];
    if(wagers.length > 0){
      wagers.forEach(bet => {
        if(bet.wager_status === 'approved'){
          approvedWagers.push(bet);
        }
        if(bet.wager_status === 'pending bettor2' && bet.bettor2 === this.state.user.id){
          needsMyApproval.push(bet);
        }
        if(bet.wager_status === 'pending bettor2' && bet.bettor1 === this.state.user.id){
          awaitingOtherBettor.push(bet);
        }
      })
      this.setState({
        approvedWagers, needsMyApproval, awaitingOtherBettor, wagers
      })
    }
  }  

  setSelectedWager = selectedWager => {
    let betAgainst = selectedWager.bettor1;
    if(selectedWager.bettor1 === this.state.user.id){
      betAgainst = selectedWager.bettor2
    }
    for( let i = 0; i < this.state.friends.length; i++){
      if(this.state.friends[i].id === betAgainst){
        betAgainst = this.state.friends[i].username
      }
    }
    selectedWager = { ...selectedWager, betAgainst, hidden: false};
    this.setState({ selectedWager })
  }

  hideSelectedWager = () =>{
    let { selectedWager } = this.state;
    selectedWager.hidden = true;
    this.setState({
      selectedWager
    })
  }

  setFriends = friends => {
    let pendingFriends = [];
    let approvedFriends = [];
    let awaitingFriends = [];
  
    if(friends.length >0){
      friends.forEach(friend => {
        if(friend.pending === false && friend.approved === true){
          approvedFriends.push(friend);
        }
        if(friend.pending === true && friend.approved === false){
          pendingFriends.push(friend);
        }
        if(friend.pending === true && friend.approved === true){
          awaitingFriends.push(friend)
        }
      })
      this.setState({
        pendingFriends, approvedFriends, awaitingFriends, friends
      })
    }
  }

  setUser = user => {
    this.setState({
       user: {
         id: user.id,
         username: user.username,
         avatar: user.avatar
       } 
    })
  }

  setAuthorized = authorized => {
    this.setState({ authorized })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render(){
    const value = {
      error: this.state.error,
      wagers: this.state.wagers,
      approvedWagers: this.state.approvedWagers,
      needsMyApproval: this.state.needsMyApproval,
      awaitingOtherBettor: this.state.awaitingOtherBettor,
      friends: this.state.friends,
      approvedFriends: this.state.approvedFriends,
      pendingFriends: this.state.pendingFriends,
      awaitingFriends: this.state.awaitingFriends,
      user: this.state.user,
      selectedWager: this.state.selectedWager,
      authorized: this.state.authorized,
      clearAll: this.clearAll,
      setError: this.setError,
      clearError: this.clearError,
      setWagers: this.setWagers,
      setSelectedWager: this.setSelectedWager,
      hideSelectedWager: this.hideSelectedWager,
      setFriends: this.setFriends,
      setUser: this.setUser,
      setAuthorized: this.setAuthorized,
    }
    
    return (
      <BragContext.Provider value={value}>
        {this.props.children}
      </BragContext.Provider>
    )
  }
}