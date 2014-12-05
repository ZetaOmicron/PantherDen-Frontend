/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the templat in the editor.
 */


$(document).ready(function() {
    $("#calendar").fullCalendar({
        eventColor: 'red',
        events: [
            {
                title: "Classroom", 
                start: "2014-12-2", 
                allDay: false, 
                editable: false}],
        hiddenDays: [1, 3],
        weekends: false,
        fixedWeekCount: true,
        dayClick: function(date, jsEvent, view) {
        }
    });


    /*Get desired date to display on table function*/
    $('#Goto').click(function() {
        var desiredDate = $('#desiredDate').val();
        var getDate = $.fullCalendar.moment(desiredDate);
        $('#calendar').fullCalendar('gotoDate', getDate);
    });

    /*upadtes clock with current time when fucntions update() is called*/
    function update() {
        $('#clock').html(moment().format('MMMM D. YYYY H:mm:ss'));
    }

    /*sets interval to update 1 second*/
    setInterval(update, 1000);
});
