var allTasksArray = [];

var currentDate = moment().format('dddd MMMM Do YYYY');
var timeExist = false;
var taskArea = $(".tasks");

$(currentDay).text(currentDate);
var currentHour = moment().hours()

// for loop
// i=9 i<18 i++
for (var i=9; i<18; i++){
    var hourElement = document.getElementById(i)
    // console.log(hourElement);
    if (currentHour === i){
        $(hourElement).addClass("present");
        //console.log(`${hourElement} is now`);
    } else if (currentHour> i){
        //console.log(`${hourElement} is in the past`);
        $(hourElement).addClass("past");
    } else {
        $(hourElement).addClass("future");
        //console.log(`${hourElement} is in the future`);
    }
};
// if current hour === row id then style .present
// else if currentHour > row id then style .past
// else style row future


// LOAD TASKS
var loadTasks = function(){
    allTasksArray = JSON.parse(localStorage.getItem("taskList"));

    if (!allTasksArray){
        allTasksArray = [];
    };
    
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
            // console.log(taskTime);
            var newTask = [];
            allTasksArray = JSON.parse(localStorage.getItem("taskList")) || [];
            var exist = false;
            newTask = [taskTime, newText];
            // had assistance from tutor for this for loop
            for(let i=0;i<allTasksArray.length;i++){
                if(allTasksArray[i][0] == taskTime){
                    allTasksArray[i][1] = newText;
                    exist = true;
                }
            }
        
            console.log(newTask);
            if(!exist){
            allTasksArray.push(newTask);
            }
            console.log(allTasksArray);

            saveTasks();
        }

    })
    
});

loadTasks();
