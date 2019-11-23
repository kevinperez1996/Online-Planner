var modal = $("#exampleModal");
var titleInput = $("#eventName");
var typeInput = $("#typeOfEvent");
var frequencyInput = $("#freq");
var timeInput = $("#timeOfDay");
var commentsInput = $("#comments");


$("#save").on("click", function(event) {
    event.preventDefault();
    var newPlan = {
        day: $(".day").val("id"),
        event: $(".event1, .event2, .event3, .event4, .event5").val("id"),
        title: $("#eventName").val(),
        type: $("#typeOfEvent").val(),
        frequency: $("#freq").val(),
        time: $("#timeOfDay").val(),
        description: $("#comments").val()
    }

    console.log(newPlan);

    $.ajax("/api/planner", {
        type: "POST",
        data: newPlan
    }).then(
        function() {
            // Reload the page to get the updated list
            // getData();
            // location.reload();
        });
});

$("#edit").on("click", function(event) {
    event.preventDefault();
    var newPlan = {
        title: $("#eventName").val(),
        type: $("#typeOfEvent").val(),
        frequency: $("#freq").val(),
        time: $("#timeOfDay").val(),
        description: $("#comments").val()
    }

    console.log(newPlan);

    $.ajax("/api/planner", {
        type: "POST",
        data: newPlan
    }).then(
        function() {
            // Reload the page to get the updated list
            // getData();
            // location.reload();
        });
});


var dataSet = [];
var testDiv = $(".testDiv")

$.get("api/plans", function(data) {
    dataSet.push(data);
    testDiv.append(dataSet)
    console.log((data[0].title));
})