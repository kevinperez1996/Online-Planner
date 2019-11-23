
var modal = $("#exampleModal");
var titleInput = $("#title");
var typeInput = $("#type");
var frequencyInput = $("#frequency");
var timeInput = $("#time");
var commentsInput = $("#comments");


$("#save").on("click", function (event) {
    event.preventDefault();
    var newPlan = {
        title: $("#title").val(),
        type: $("#type").val(),
        frequency: $("#frequency").val(),
        time: $("#time").val(),
        description: $("#comments").val()
    }

    console.log(newPlan);

    $.ajax("/api/planner", {
        type: "POST",
        data: newPlan
    }).then(
        function () {
            // Reload the page to get the updated list
            // getData();
            // location.reload();
        });
});

var dataSet = [];
var testDiv = $(".testDiv")

$.get("api/plans", function (data) {
    dataSet.push(data);
    testDiv.append(dataSet)
    console.log((data[0].title));
})


