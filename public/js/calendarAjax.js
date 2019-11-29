
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
            console.log(currentUser);
            return currentUser;
        });
    });


$(document).on("click", ".delete", function deletePlan() {

    var currentPlan = $(this).attr("id");

    alert("deleted");
    console.log(currentPlan)

    $.ajax({
        method: "DELETE",
        url: "/api/plans/" + currentPlan
    })
        .then(function () {
            getPlans();
        });

});


$(document).on("click", "#edit2", function editPlan() {

    console.log(currentID);

    var newPlan = {
        title: $("#title2").val().trim(),
        type: $("#type2").val().trim(),
        time: $("#time2").val().trim(),
        description: $("#comments2").val().trim(),
        eventDate: selectedEvent,
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

    console.log(newPlan);

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

        console.log(data);
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

// function handlePlanDelete (data){
//     var currentPlan = $(this).val("id")
//     .parent()
//     .parent()
//     .data("plans");
//     console.log(currentPlan);
//     // deletePlan(currentPlan);
// }




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
    var newPostCategory = $("<h5>");
    newPostCategory.text(data.type);
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(data.title + " ");
    newPostBody.text(data.description);
    // var formattedDate = new Date(data.date);
    // formattedDate = moment(formattedDate).format("L");
    newPostDate.text(data.eventDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostCategory);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", data);
    return newPostCard;
}

