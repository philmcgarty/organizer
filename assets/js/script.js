// store all saved tasks - used for pushing to local storage
var allTasksArray = [];
// fetches the current date
var currentDate = moment().format('dddd MMMM Do YYYY');
// for checking if a time already exists in the array
var timeExist = false;
// used for event click to indicate a task for editing
var taskArea = $(".tasks");
// sets display text for date
$(currentDay).text(currentDate);
// pulls current hour from moment.js for below styling based on time
var currentHour = moment().hours()

// loop checks the current time on page load and sets background colors accordingly
for (var i=9; i<18; i++){
    var hourElement = document.getElementById(i);
    if (currentHour === i){
        // sets color to red if time is now
        $(hourElement).addClass("present");
    } else if (currentHour> i){
        // sets color to grey if time has passed
        $(hourElement).addClass("past");
    } else {
        // sets color to green if time in future
        $(hourElement).addClass("future");
    }
};


// LOAD TASKS
var loadTasks = function(){
    allTasksArray = JSON.parse(localStorage.getItem("taskList"));
    // creates blank array if nothing saved
    if (!allTasksArray){
        allTasksArray = [];
    };
    // loop to display saved tasks in correct time blocks
    for (var i=0;i<allTasksArray.length;i++){
        var hour = allTasksArray[i];     
        var taskTime = hour[0];
        var taskText = hour[1];
        // locate correct row
        var findHour = document.getElementById(taskTime)
        // locates decendent span
        var findSpan = $(findHour).children(".tasks").children("span");
        // assigns task text to correct span element
        $(findSpan).text(taskText);
    }
       
};


// SAVE TASK ARRAY TO LOCAL STORAGE
var saveTasks= function(){
    localStorage.setItem("taskList", JSON.stringify(allTasksArray));
};


// CHANGE TO TEXT INPUT AND BACK - used Taskmaster Pro for reference
// on click task area
$(taskArea).on("click", function() {
    // pulls existing text to push to input box
    var text = $(this)
        .text()
        .trim();
    // create input box element
    var textInput = $("<textarea>").val(text).attr("class", "task-item");
    // replace the span with input
    $(this).children("span").replaceWith(textInput);
    // highlight input box
    textInput.trigger("focus");
    // define save area as button
    var saveBtn = $(this).siblings(".saveBtn");
    // on click corresponding save button change input back to span
    $(saveBtn).on("click", function(){
        // variable for storing edited text
        var newText = $(this).siblings(".tasks").children(".task-item").val()
            .trim();
        // this if statement stops input being overwritten with blank "" when save button clicked more than once
        if (newText){
            // assigns edited text and class to span element
            var span = $("<span>").text(newText).attr("class", "task-item");      
            // replaces input with span
            $(textInput).replaceWith(span);
            // set variables to save in array
            var taskTime = $(this).parent().attr("id");
            // var to hold new info to push to array and then local storage
            var newTask = [];
            allTasksArray = JSON.parse(localStorage.getItem("taskList")) || [];
            // var to record if something exists for the given time already
            var exist = false;
            newTask = [taskTime, newText];
            // had assistance from tutor for this for loop
            for(let i=0;i<allTasksArray.length;i++){
                if(allTasksArray[i][0] == taskTime){
                    allTasksArray[i][1] = newText;
                    exist = true;
                }
            }            
            if(!exist){
            allTasksArray.push(newTask);
            }
            saveTasks();
        }
    })  
});

// load the existing tasks
loadTasks();