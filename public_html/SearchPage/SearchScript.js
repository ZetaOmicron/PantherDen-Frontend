$(document).ready(function() {

});


function searchtype(input) {
    if(input.charAt(0)=='4') {
        return "ID";
    }
    if(input.charAt(0)=='1'||input.charAt(0)=='2') {
        return "Room";
    }
    if(input.substring(0,2).toUpperCase()=="AUD") {
        return "Room";
    }
};