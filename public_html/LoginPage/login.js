var server_location = "http://localhost:8000";

$(document).ready(function () {
    if(readCookie("user")!=null){
        location.href="../Search%20Page/SearchPage.html";
        return;
    }
    $('#admin').on('click', function () {
        $('.flipper').addClass('flip');
        $('#logintype').text("Administrator Login");
        setTimeout(function () {
            $('#username').focus();
        }, 500);
    });
    $('#teach').on('click', function () {
        $('.flipper').addClass('flip');
        $('#logintype').text("Teacher Login");
        setTimeout(function () {
            $('#username').focus();
        }, 500);
    });
    $('#Back').on('click', function () {
        $('.flipper').removeClass('flip');
        setTimeout(function () {
            $('#username').val("");
            $('#password').val("");
        }, 500);
    });
});

function checkIfUserAndStoreCookie(){
    var form = $("#login");
    var tid = form.find("#username").val();
    var req = $.ajax({
        type:'GET',
        url: server_location+"/teacher/"+tid,
        dataType: 'json',
        success: function (data) {
            createCookie("user",JSON.stringify(data),5);
            location.href="../Search%20Page/SearchPage.html";
        },
        error: function(err){
            $("#error-container").html("No teacher with the id of "+tid+" was found.");
        }
    });
    return false;
}