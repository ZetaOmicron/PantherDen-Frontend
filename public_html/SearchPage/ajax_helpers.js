var server_location ="http://localhost:8000/";
var headers = {student:[{title: "ID", valuename: "id"},
                           {title: "Last Name", valuename: "last_name"},
                           {title: "First Name", valuename: "first_name"},
                           {title: "Homeroom Teacher", valuename: "home_room_teacher_id"}],
               teacher:[{title: "ID", valuename: "id"},
                         {title: "Last Name", valuename: "last_name"},
                         {title: "First Name", valuename: "first_name"},
                         {title: "Homeroom", valuename: "room_id"}]};



function genCheckBox(num){
    return "<div class='checkboxp'><input type='checkbox' value='None' name='check' id='checkbox"+num+"'/><label for='checkbox"+num+"'></label></div>";
}
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
    if(list.length==0){
        $results.html("No Results Found");
        return;
    }
    var reshtml = "";
    for (var i = 0; i < list.length; i++) {
        li = list[i];
        treshtml = "<tr>";
        for(var j=0; j< heads.length; j++){
            treshtml += '<td>' + li[heads[j]["valuename"]] + '</td>';
        }
        treshtml += "<td>" + genCheckBox(i+1)+ "</td>";
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
    hhtml+="<th>" + genCheckBox(0) + "</th>";
    $header.html(hhtml);
}

function logout(){
    eraseCookie("user");
    location.href="../LoginPage/LoginPage.html";
}