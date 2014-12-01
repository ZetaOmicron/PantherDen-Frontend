$(document).ready(function () {
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