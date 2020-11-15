const Helpers = {
  
  processDate(date) {
    let myDate = new Date(date);
    return myDate.toLocaleDateString();
  },

  getFriendById(user, friends, bettor1, bettor2) {
    let needName = null;
    let friendName;
    if(bettor1 !== user){
      needName = bettor1;
    } else if(bettor2 !== user){
      needName = bettor2;
    }
    friends.map(friend => 
      needName === friend.friend_id 
      ?   friendName = friend.username
      :  ''
    )
    return friendName;
  },

  shorten(title){
    if(title.length <= 16)
      return title;
    let newTitle = `${title.slice(0, 13)}...`;
    return newTitle;
  },

  winRatio(wins, losses){
    const totalBets = wins + losses;
    if(totalBets === 0)
      return `N/A`;
    if(wins === 0)
      return 0;
    const percentage = wins/totalBets*100;
    if(isNaN(percentage)) {
      return 'No completed wagers.'
    }
    return `${percentage.toFixed(2)}%`;
  }
 
}

export default Helpers;