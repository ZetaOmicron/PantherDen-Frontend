var server_location ="http://localhost:8000/";
var headers = {student:[{title: "ID", valuename: "id"},
                           {title: "Last Name", valuename: "lastname"},
                           {title: "First Name", valuename: "firstname"},
                           {title: "Homeroom", valuename: "homeroomid"}],
               teacher:[{title: "ID", valuename: "id"},
                         {title: "Last Name", valuename: "lastname"},
                         {title: "First Name", valuename: "firstname"},
                         {title: "Homeroom", valuename: "roomid"}]};
var $checkbox = "<div class='checkbox'><input type='checkbox' value='None' id='checkmark' name='check' /><label for='checkmark'></label></div>";
function appendSearchResults($table,model, field, query, page){
    var req = $.ajax({
        type:'GET',
        url: server_location+model+'/search/?f='+field+'&q='+query+'&p='+page,
        dataType: 'json',
        success: function (data) {
            appendRes($table, model, data);
        },
        error: function(err){
            console.log(err);
        }
    });
}

function appendRes($table, model, data){
    var $results = $table.find("tbody");
    var heads = headers[model];
    updateHeader($table, model);
    var list = data[model + "s"];
    var reshtml = "";
    for (var i = 0; i < list.length; i++) {
        li = list[i];
        treshtml = "<tr>";
        for(var j=0; j< heads.length; j++){
            treshtml += '<td>' + li[heads[j]["valuename"]] + '</td>';
        }
        treshtml += "<td>" + $checkbox + "</td>";
        treshtml += "</tr>";
        reshtml += treshtml;
    }
    $results.html(reshtml);
}

function updateHeader($table, model){
    var $header = $table.find("thead");
    var $results = $table.find("tbody");
    var heads = headers[model];
    var hhtml = "";
    for(var i=0; i<heads.length; i++){
        hhtml+="<th>"+heads[i]["title"]+"</th>";
    }
    hhtml+="<th>" + $checkbox + "</th>";
    $header.html(hhtml);
}