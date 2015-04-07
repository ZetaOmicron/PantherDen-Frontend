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
                start: $.fullCalendar.moment().get('year')+"-"+($.fullCalendar.moment().get('month')+1)+"-"+$.fullCalendar.moment().get('day'),
                allDay: false,
                editable: false
            }
        ],
        hiddenDays: [1, 3],
        weekends: false
    });
});
