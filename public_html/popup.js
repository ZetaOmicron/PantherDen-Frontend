$(document).ready(function () {
    $("#actionLabelWrapper").hide();
    $("#cover").hide();
    var flag = 0;
    $("#buttonwrapper").click(function () {
        flag = 1;
        $("#actionLabelWrapper").fadeIn(300);
        $("#cover").fadeIn(300);
    });

    $("#cover").click(function () {
        $("#actionLabelWrapper").fadeOut(300);
        $("#cover").fadeOut(300);
    });


    $("#actionDropDown").click(function () {
        $(this).dropdown();
    });


});