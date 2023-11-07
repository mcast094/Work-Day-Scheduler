// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentTime = document.getElementById("currentDay");
currentTime.textContent = dayjs().format('MMMM D YYYY');
var currentHour = dayjs().hour();
var saveButtonEl = $('.saveBtn');
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  saveButtonEl.on('click', function (event) {
    console.log(this);
    var parentID = $(this).parent().attr('id');
    var textArea = $(this).siblings("textarea");
    localStorage.setItem(parentID, textArea.val())
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  
  // function to determine past, present, or future 
  $(".time-block").each(function (i){
    var id = $(this).attr("id").split("-");
    var currentTimeBlock = parseInt(id[1]);
    console.log(currentHour, currentTimeBlock);
    var textArea = $(this).children("textarea");
    var parentID = $(this).attr('id');
    var localStorageValue = localStorage.getItem(parentID);
    textArea.val(localStorageValue);
    if(currentHour > currentTimeBlock) {
      $(this).removeClass("future");
      $(this).removeClass("present");
      $(this).addClass("past");
    } else if (currentHour === currentTimeBlock){
      $(this).addClass("present");
      $(this).removeClass("past");
      $(this).removeClass("future");
    } else {
      $(this).addClass("future");
      $(this).removeClass("past");
      $(this).removeClass("present");
    }

  });
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function saveToLocalStorage() {
    var timeBlocks = document.querySelectorAll('.time-block');
    for (var i = 0; i < timeBlocks.length; i++) {
      var timeBlock = timeBlocks[i];
      var timeBlockId = timeBlock.getAttribute('id');
      var description = timeBlock.querySelector('.description').value;
      localStorage.setItem(timeBlockId, description);
    }
  }
  // TODO: Add code to display the current date in the header of the page.
  
  
});
