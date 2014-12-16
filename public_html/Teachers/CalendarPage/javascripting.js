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
        weekends: false,
        fixedWeekCount: true
    });
    

    /*Get desired date to display on table function*/
    $('#Goto').click(function() {
        
        

        var desiredDate = $('#datepicker').val();
        var getDate = $.fullCalendar.moment(desiredDate);
        
        /*checks to see if date is an actual date*/
        if (getDate.day() === 1 || getDate.day() ===  3 || getDate.day() === 6 || getDate.day() === 7) {
            $('#idiot').html('There is no Panther Den on desired date.');
        } else if (getDate.isValid() === false){
            $('#idiot').html('This is an invalid date. Please choose another date');
        }else {
            $('#calendar').fullCalendar('gotoDate', getDate);
        }

    });

    /*upadtes clock with current time when fucntions update() is called*/
    function update() {
        $('#clock').html(moment().format('MMMM D. YYYY H:mm:ss'));
    }

    /*sets interval to update 1 second*/
    setInterval(update, 1000);
});
