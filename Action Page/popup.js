$(document).ready(function () {
    $("#welcome").hide();

    
    $("#actionbutton").click(function () {

        $("#welcome").show();
    });

    $("#actionDropDown").click(function () {
        $(this).dropdown();
    });
});