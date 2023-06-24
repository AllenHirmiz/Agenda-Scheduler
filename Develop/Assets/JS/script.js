//This function is to capture today date and week day name to the page header
function getToday() {
  var todayDate = dayjs().format('dddd, MMMM D');
  $("#currentDay").text(todayDate);
  return (todayDate);
}

//This function is to generate the agenda rows depending on number of hours "totalHours"
function createDatabase() {

  var totalHours = 9; // Number of hours rows
  var hoursStart = "9"; // Agenda Start hour
  var taskText = "";
  var todayDate = getToday();
  var myDay = [];
  var agendaHour = dayjs().hour(12);
  console.log("hour "+ dayjs().hour(12).format('h A'));
  
  for (var index = 0; index < totalHours; index++) {
    myDay.push({hour: hoursStart,task: taskText});
    hoursStart++;
  }
  
  var dataToday = localStorage.getItem(todayDate)
  if (dataToday == null) {
    localStorage.setItem(todayDate, JSON.stringify(myDay));
  }

  console.log("Myday "+myDay);
}

//displayDayPlanner function renders the HTML to display the timetable 
function displayDayPlanner() {
  var currentDate = getToday();
  var getDay = JSON.parse(localStorage.getItem(currentDate));
  var appointmentConfirmation = $('<div>').attr({"id": "alert-message"});
  var messageAdd = $('<div>').attr({ "class": "message"});
  var messageLocalStorage = $('<div>').attr({ "class": "message local-storage"});
  var messageIcon = $('<div>').attr({ "class": "message"});
  var clearAllButton = $("<button>").attr({ "class": "col-lg-1 clear-button p-2 m-2", "id": "start-new-day", "value": "Start New Day"});

  clearAllButton.text("Start A New Day");
  appointmentConfirmation.append(messageAdd," ", messageLocalStorage," ", messageIcon);
  
  $(".container-lg").append(appointmentConfirmation);
  $(".container-md").append(clearAllButton);


  // When Start New Day button is clicked will clear out all local host values
  $("#start-new-day").click(
    function () {
      clearLocal();
    }
  );

  for (var i = 0; i < getDay.length; i++) {

    var getHourNumber = dayjs().hour(getDay[i].hour).format('h A');
    var getHour = getDay[i].hour;
    var getTask = getDay[i].task;
    var timeTableRow = $('<div>').attr({ "class": "row", "id": "form_" + getHour });
    var hourArea = $('<div>').text(getHourNumber).attr({ "class": "col-md-2 hour", "id": "div_" + getHour });
    var saveButton = $("<button>").attr({ "class": "col-md-1 saveBtn", "id": "Btn_" + getHour });
    var taskArea = $('<textarea>').text(getTask).attr({ "id": "textarea_" + getHour });
    var buttonIcon = $("<i class='far fa-save fa-lg'></i>");
    var dayPresent = dayjs().hour();
    var dayCheck = getHour;
    
    
    console.log("dayCheck " + dayCheck);
    console.log("dayPresent "+ dayPresent);
    console.log("getHour " + getHour);
    console.log("dayjs().hour() "+ dayjs().hour());

    if (getHour < dayjs().hour()) {
      taskArea.attr({ "class": "col-md-9 description past" });
    } else if (getHour == dayjs().hour()) {
      taskArea.attr({ "class": "col-md-9 description present" });
    } else {
      taskArea.attr({ "class": "col-md-9 description future" });
    }

    saveButton.append(buttonIcon);
    timeTableRow.append(hourArea, taskArea, saveButton)


    $(".container-lg").append(timeTableRow);

    //When Save Button is clicked to rub the following tasks
    $("#Btn_" + getHour).click(
      function () {
        var id = this.id;
        messageAdd.text("Appointment Added to");
        messageLocalStorage.text("localStorage");
        messageIcon.attr({ "class": "fas fa-check icon"});
        saveBtn(id);
      }
    );
  }
}


function saveBtn(id) {

  var hour_id = id.split("_")[1]
  var textToSave = $("#textarea_" + hour_id).val();
  var currentDate = getToday();
  var getDay = JSON.parse(localStorage.getItem(currentDate));

  for (var i = 0; i < getDay.length; i++) {
    var getHour = getDay[i].hour;
    if (getHour == hour_id) {
      getDay[i].task = textToSave;
      localStorage.setItem(currentDate, JSON.stringify(getDay));
      break;
    }
  }
}


function clearLocal() {
  localStorage.clear();
  location.reload();
}

function init() {
  createDatabase()
  displayDayPlanner()
}

init();