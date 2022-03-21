var allTasksArray = [];

var currentDate = moment().format('dddd MMMM Do YYYY');
var timeExist = false;
var taskArea = $(".tasks");

$(currentDay).text(currentDate);


// LOAD TASKS
var loadTasks = function(){
    allTasksArray = JSON.parse(localStorage.getItem("taskList"));

    if (!allTasksArray){
        allTasksArray = [];
    };

    for (i=0;i<allTasksArray.length;i++){
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
        // assigns edited text and class to span element
        var span = $("<span>").text(newText).attr("class", "task-item");      
        // replaces input with span
        $(textInput).replaceWith(span);

        // set variables to save in array
        var taskTime = $(this).parent().attr("id");
        // console.log(taskTime);
        var newTask = [];
        
        newTask = [taskTime, newText];
        
        // for (i=0; i<allTasksArray.length; i++){
        //     timeExist = false;
        //     var timeCheck = allTasksArray[i][0]
        //     if (timeCheck === taskTime){
        //         timeExist = true;
        //         console.log("This time exists already!");
        //         allTasksArray[i][1] = newText;
        //         console.log(allTasksArray[i]);
        //         saveTasks();
        //         return;
        //     }            

        // }console.log("This time doesn't exist yet!")
        //         allTasksArray.push(newTask);
        
        console.log(newTask);
        allTasksArray.push(newTask);
        
        console.log(allTasksArray);

        saveTasks();

    })
    
});

loadTasks();
