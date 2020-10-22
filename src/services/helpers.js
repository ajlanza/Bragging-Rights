const Helpers = {
  
  processDate(date) {
    // let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // let d = new Date();
    // let monthName=months[d.getMonth()];
    // console.log(monthName);
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
 
}

export default Helpers;