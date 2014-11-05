$(document).ready(function () {
    $("#actionLabelWrapper").hide();

    $("#actionbutton").click(function () {
        $("#actionLabelWrapper").show();
    });

    $("#actionDropDown").click(function () {
        $(this).dropdown();
    });


});