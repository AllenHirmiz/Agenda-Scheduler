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

//displayDayPlanner function renders the HTML to display the timetable 
function displayDayPlanner() {
  var currentDate = getToday();

  var savedDay = JSON.parse(localStorage.getItem(currentDate));


  var appointmentConfirmation = $('<div>').attr({"id": "alert-message"});
  var messageAdd = $('<div>').attr({ "class": "message"});
  var messageLocalStorage = $('<div>').attr({ "class": "message local-storage"});
  var messageIcon = $('<div>').attr({ "class": "message"});
  appointmentConfirmation.append(messageAdd," ", messageLocalStorage," ", messageIcon);
  $(".container-lg").append(appointmentConfirmation);

  for (var i = 0; i < savedDay.length; i++) {

    var getHour = savedDay[i].hour;
    var getTask = savedDay[i].task;

    var timeTableRow = $('<div>').attr({ "class": "row", "id": "form_" + getHour });
    var hourArea = $('<div>').text(getHour).attr({ "class": "col-md-2 hour", "id": "div_" + getHour });
    var saveButton = $("<button>").attr({ "class": "col-md-1 saveBtn", "id": "Btn_" + getHour });
    var taskArea = $('<textarea>').text(getTask).attr({ "id": "textarea_" + getHour });

    var buttonIcon = $("<i class='far fa-save fa-lg'></i>");
    var momentPresent = moment().hour();
    var momentCheck = getHour;

    console.log("momentCheck " + momentCheck);
    console.log("momentPresent "+ momentPresent);

    if (momentCheck < momentPresent) {
      taskArea.attr({ "class": "col-md-9 description past" });
    } else if (momentCheck == momentPresent) {
      taskArea.attr({ "class": "col-md-9 description present" });
    } else {
      taskArea.attr({ "class": "col-md-9 description future" });
    }

    saveButton.append(buttonIcon);
    timeTableRow.append(hourArea, taskArea, saveButton)


    $(".container-lg").append(timeTableRow);

    //Function to handle events where save button is clicked
    $("#Btn_" + getHour).click(
      function () {
        var id = this.id;
        messageAdd.text("Appointment Added to");
        messageLocalStorage.text("localStorage");
        messageIcon.attr({ "class": "fas fa-check icon"});
        saveAgendaBtn(id);
      }
    );
  }
}


function saveAgendaBtn(id) {

  var hour_id = id.split("_")[1]
  var textToSave = $("#textarea_" + hour_id).val();
  var currentDate = getToday();
  var savedDay = JSON.parse(localStorage.getItem(currentDate));

  for (var i = 0; i < savedDay.length; i++) {
    var getHour = savedDay[i].hour;
    if (getHour == hour_id) {
      savedDay[i].task = textToSave;
      localStorage.setItem(currentDate, JSON.stringify(savedDay));
      break;
    }
  }
}

function init() {
  createDatabase()
  displayDayPlanner()
}

init();