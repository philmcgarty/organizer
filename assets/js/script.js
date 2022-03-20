var taskArray = [];

var currentDate = moment().format('dddd MMMM Do YYYY');

var taskArea = $(".tasks");

$(currentDay).text(currentDate);



// CHANGE TO TEXT INPUT AND BACK - used taskmaster pro for reference
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
    })
    

});


