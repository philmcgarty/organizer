var currentDate = moment().format('dddd MMMM Do YYYY');

var taskItem = $(".tasks");

$(currentDay).text(currentDate);


var clickthis = function(){
    row = ($(this).parent(".row"));
    console.log(row.attr("id"));
};


$(taskItem).on("click", clickthis);