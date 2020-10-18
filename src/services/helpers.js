
const Helpers = {
    
  processDate(date) {
    // let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // let d = new Date();
    // let monthName=months[d.getMonth()];
    // console.log(monthName);
    let myDate = new Date(date);
    return myDate.toLocaleDateString();
  },
 
}

export default Helpers;