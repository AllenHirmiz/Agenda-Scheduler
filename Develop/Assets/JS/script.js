//This function is to capture today date and week day name to the page header
function getToday() {
  var todayDate = moment().format('dddd, MMMM Do');
  $("#currentDay").text(todayDate);
  return (todayDate);
}

//This function is to generate the agenda rows depending on number of hours "totalHours"
function createDatabase() {

  var totalHours = 9;
  var hoursStart = "9";
  var taskText = "";
  var todayDate = getToday();
  var myDay = [];
  
  for (var index = 0; index < totalHours; index++) {
    myDay.push({hour: hoursStart,task: taskText});
    hoursStart++;
  }
  
  var dataToday = localStorage.getItem(todayDate)
  if (dataToday == null) {
    localStorage.setItem(todayDate, JSON.stringify(myDay));
  }

  console.log(myDay);
}


createDatabase();