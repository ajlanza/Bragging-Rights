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
  pendingWagers: [],
  approvedFriends: [],
  pendingFriends: [],
  selectedWager: [],
  error: null,
  authorized: null,

  clearAll: () => {},
  setWagers: () => {},
  setSelectedWager: () => {},
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
    wagers: [{
      id: null,
      title: null,
      start_date: null,
      end_date: null,
    }],
    approvedWagers: [],
    pendingWagers: [],
    approvedFriends: [],
    pendingFriends: [],
    selectedWager: [],
    error: null,
    authorized: false,
  };

  clearAll = () => {
    this.setState ({
      user: {},
      friends: [],
      wagers: [],
      approvedWagers: [],
      pendingWagers: [],
      selectedWager: [],
      authorized: false
    })
  }

  setWagers = wagers => {
    let pendingWagers = [];
    let approvedWagers = [];
  
    if(wagers.length >0){
      wagers.forEach(bet => {
        if(bet.wager_status === 'approved'){
          approvedWagers.push(bet);
        }
        if(bet.wager_status === 'pending bettor2'){
          pendingWagers.push(bet);
        }
      })
      this.setState({
        pendingWagers, approvedWagers
      })
    }
  }  

  setSelectedWager = selectedWager => {
    console.log(selectedWager);
    let betAgainst = selectedWager.bettor1;
    if(selectedWager.bettor1 === this.state.user.id){
      betAgainst = selectedWager.bettor2
    }
    for( let i = 0; i < this.state.friends.length; i++){
      if(this.state.friends[i].id === betAgainst){
        betAgainst = this.state.friends[i].username
      }
    }
    selectedWager = { ...selectedWager, betAgainst};
    console.log('new selected Wager: ', selectedWager);
    this.setState({ selectedWager })
  }

  setFriends = friends => {
    console.log('set friends in context: ', friends)
    let pendingFriends = [];
    let approvedFriends = [];
  
    if(friends.length >0){
      friends.forEach(friend => {
        if(friend.pending === false && friend.approved === true){
          approvedFriends.push(friend);
        }
        if(friend.pending === true && friend.approved === false){
          pendingFriends.push(friend);
        }
      })
      console.log('pending friends: ', pendingFriends);
      console.log('approved friends: ', approvedFriends);
      this.setState({
        pendingFriends, approvedFriends
      })
    }
    this.setState({ friends });
    console.log('state approved', approvedFriends);
    console.log('state pending: ',pendingFriends);
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
      pendingWagers: this.state.pendingWagers,
      friends: this.state.friends,
      approvedFriends: this.state.approvedFriends,
      pendingFriends: this.state.pendingFriends,
      user: this.state.user,
      selectedWager: this.state.selectedWager,
      authorized: this.state.authorized,
      clearAll: this.clearAll,
      setError: this.setError,
      clearError: this.clearError,
      setWagers: this.setWagers,
      setSelectedWager: this.setSelectedWager,
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