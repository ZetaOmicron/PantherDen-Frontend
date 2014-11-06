$(document).ready(function () {
    $("#actionLabelWrapper").hide();
    $("#cover").hide();
    var flag = 0;
    $("#buttonwrapper").click(function () {
        flag = 1;
        $("#actionLabelWrapper").show();
        $("#cover").show();
    });

    $("#cover").click(function () {
        $("#actionLabelWrapper").hide();
        $("#cover").hide();
    });


    $("#actionDropDown").click(function () {
        $(this).dropdown();
    });


});