var amtOfConflicts = 0;
$(document).ready(function () {

    $("#accept-submission1").click(function () {
        $("#content-row1").hide();
    });
    $("#deny-submission1").click(function () {
        $("#content-row1").hide();
    });
});

//adds a new conflict bar to the page
function addConflict(student, startingClass, classesToTransfer, date, conflictID) {
    var toAppend = '<tr id="content-row' + conflictID + '"><td>' + student + '</td><td>' + startingClass + '&#8594;';
    for (var i = 0; i < classesToTransfer.length; i++) {
        toAppend += '<button type="button" class="btn btn-default">' + classesToTransfer[i] + '</button>';
    }

    toAppend = toAppend + '</td><td>' + date + '</td><td><div class="accept-decline-pair"><a href="#"><span  id= "accept-submission' + conflictID + '" class="glyphicon glyphicon-ok-circle accept" aria-hidden="true"></span></a></div></td></tr>';
    $("#conflict-table-body").append($(toAppend));


    $("#accept-submission" + conflictID + "").click(function () {
        $("#content-row" + conflictID + "").hide();
    });

}