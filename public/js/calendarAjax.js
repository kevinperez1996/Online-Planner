
var modal = $("#exampleModal");
var titleInput = $("#title");
var typeInput = $("#type");
var frequencyInput = $("#frequency");
var timeInput = $("#time");
var commentsInput = $("#comments");
var currentID = 0;

var currentUser = "";

    $(document).ready(function () {
        $.get("/api/user_data").then(function (data) {
            currentUser = data.id;
            return currentUser;
        });
    });


$(document).on("click", ".delete", function deletePlan() {

    var currentPlan = $(this).attr("id");

    // console.log(currentPlan)

    $.ajax({
        method: "DELETE",
        url: "/api/plans/" + currentPlan
    })
        .then(function () {
            getPlans();
        });

});


$(document).on("click", "#edit2", function editPlan() {

    var newPlan = {
        title: $("#title2").val().trim(),
        type: $("#type2").val().trim(),
        time: $("#time2").val().trim(),
        description: $("#comments2").val().trim(),
        id: currentID
    }

    $.ajax({
        method: "PUT",
        url: "/api/plans",
        data: newPlan
    })
        .then(function () {
            getPlans();
        });
});


$("#save").on("click", function (event) {

    event.preventDefault();

    var newPlan = {
        title: $("#title").val().trim(),
        type: $("#type").val().trim(),
        time: $("#time").val().trim(),
        description: $("#comments").val().trim(),
        eventDate: selectedEvent
    }

    // console.log(newPlan);

    $.ajax("/api/planner", {
        type: "POST",
        data: newPlan
    }).then(
        function () {

            location.reload();
        });
});


var testDiv = $(".testDiv")

function getPlans() {
    $.get("api/plans", function (data) {

        initializeRows(data);

    });

}

getPlans();

function initializeRows(data) {
    $(".testDiv").empty();
    var dataSet = [];

    for (var i = 0; i < data.length; i++) {

        dataSet.push(createNewRow(data[i]));
    }

    $(".testDiv").append(dataSet);
}

$(document).on("click", ".edit", function () {
    currentID = $(this).attr("id");
})


function createNewRow(data) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    deleteBtn.attr("id", data.id);
    var editBtn = $("<button>");
    editBtn.attr("data-toggle", "modal");
    editBtn.attr("id", data.id);
    editBtn.attr("data-target", "#editModal");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-secondary");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostTime = $("<small>")
    var newPostCategory = $("<h5>");
    newPostCategory.text("Type: " + data.type);
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    var newPostBody2 = $("<h5>")
    newPostTitle.text(data.title);
    newPostBody2.text("Description: ");
    newPostBody.text(data.description);
    newPostDate.text(" | " + data.eventDate);
    newPostTime.text(" | "  + moment(data.time, "HH:mm").format("hh:mm a") + " | ");
    newPostTitle.append(newPostDate);
    newPostTitle.append(newPostTime);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostCategory);
    newPostCardBody.append(newPostBody2);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", data);
    return newPostCard;
}

