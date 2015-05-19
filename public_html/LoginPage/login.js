var server_location = "http://localhost:8000";

var isTeacher = true;

$(document).ready(function () {
    init();
    if(readCookie("user")!=null){
        location.href="../Teachers/SearchPage/SearchPage.html";
        return;
    }
    $('#admin').on('click', function () {
        isTeacher=false;
        $('.flipper').addClass('flip');
        $('#logintype').text("Data Manager Login");
        setTimeout(function () {
            $('#username').focus();
        }, 500);
    });
    $('#teach').on('click', function () {
        isTeacher=true;
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
            $("#error-container").fadeOut(0);
        }, 500);
    });
});

//initializes elements in their proper starting positions
function init(){
    $("#error-container").hide();
}

function checkIfUserAndStoreCookie(){
    var form = $("#login");
    var tid = form.find("#username").val();
    var req = $.ajax({
        type:'GET',
        url: server_location+"/teacher/"+tid,
        dataType: 'json',
        success: function (data) {
            createJSONCookie("user",data,5);
            if(isTeacher){
                location.href="../Teachers/DenPage/DenPage.html";
            }else{
                location.href="../DataManagers/ConflictPage/ConflictPage.html";
            }
        },
        error: function(err){
            $("#error-container").fadeIn(600);
            $("#error-container").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>  No teacher with the id of <strong>'+tid+'</strong> was found.');
        }
    });
    return false;
}