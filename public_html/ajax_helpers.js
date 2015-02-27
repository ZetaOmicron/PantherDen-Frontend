var server_location = "http://localhost:8000/";
var headers = {student: [
    {title: "ID", valuename: "id"},
    {title: "Last Name", valuename: "last_name"},
    {title: "First Name", valuename: "first_name"},
    {title: "Homeroom Teacher", valuename: "home_room_teacher_id"}
],
    teacher: [
        {title: "ID", valuename: "id"},
        {title: "Last Name", valuename: "last_name"},
        {title: "First Name", valuename: "first_name"},
        {title: "Homeroom", valuename: "room_id"}
    ]
};

var data_on_table = [];
var selected = {};

function toggleAdd(pos){
    if(pos in selected){
        delete selected[pos];
    }else{
        selected[pos]=true;
    }
    if(data_on_table.length == Object.keys(selected).length){
        $("#checkbox0").prop("checked",true);
    }else{
        $("#checkbox0").prop("checked",false);
    }
}

function clickAll(){
    var unsa = data_on_table.length == Object.keys(selected).length;
    for(var i=1; i<=data_on_table.length; i++){
        if(unsa){
            delete selected[i];
            $("#checkbox"+i).prop("checked",false);
        }
        else if(!(i in selected)){
            selected[i]=true;
            $("#checkbox"+i).prop("checked",true);
        }
    }
}

function checkAbsents(){
    for(var i=1; i<=data_on_table.length; i++){
        if(data_on_table[i-1]["absent"]){
            selected[i]=true;
            $("#checkbox"+i).prop("checked",true);
        }

    }
}

function setNoneFound($table){
    $("#error-handle").html('<div class="alert alert-warning none-found-wrapper" role="alert">'+
            '<span class="glyphicon glyphicon-question-sign" aria-hidden="true" style="margin-right: 10px">'+
            '</span>'+
            'No Results Found'+
            '</div>'
    );
    $table.find("tbody").html("");
}

function setSuccess($table, message){
    $("#error-handle").html('<div class="alert alert-success none-found-wrapper" role="alert">'+
            '<span class="glyphicon glyphicon-check" aria-hidden="true" style="margin-right: 10px">'+
            '</span>'+
            message+
            '</div>'
    );
}

function genCheckBox(num, disable, checkall) {
    return "<div class='checkboxp'>" +
        "<input onclick='"+(checkall ? "clickAll()" : "toggleAdd("+num+")")+"'" +
        "type='checkbox' value='None' name='check' id='checkbox" + num + "' "
        +(disable ? "disabled" : "")+"/><label for='checkbox" + num + "'></label></div>";
}
function appendSearchResults($table, model, field, query, page) {
    var req = $.ajax({
        type: 'GET',
        url: server_location + model + '/search/?f=' + field + '&q=' + query + '&p=' + page,
        dataType: 'json',
        success: function (data) {
            appendRes($table, model, data);
        },
        error: function (err) {
            setNoneFound($table);
            console.log(err);
        }
    });
}

function getRoster($table, tid) {
    var req = $.ajax({
        type: 'GET',
        url: server_location + "teacher/" + tid + "/students/today/",
        dataType: 'json',
        success: function (data) {
            appendHRRes($table, data);
        },
        error: function (err) {
            setNoneFound($table);
            console.log(err);
        }
    });
}

function appendHRRes($table, data) {
    data_on_table = [];
    selected={};
    var model = "student";
    var types = ["moved", "default", "new"];
    var $results = $table.find("tbody");
    var heads = headers[model];
    updateHeader($table, model, "Absent");
    var reshtml = "";
    var c = 1;
    for (var k = 0; k < types.length; k++) {
        var sect = data[types[k]];
        for (var i = 0; i < sect.length; i++) {
            li = sect[i];
            data_on_table.push(li);
            treshtml = "<tr class='"+types[k]+"-color'>";
            for (var j = 0; j < heads.length; j++) {
                treshtml += '<td>' + li[heads[j]["valuename"]] + '</td>';
            }
            treshtml += "<td>" + genCheckBox(c, types[k]=="moved") + "</td>";
            c+=1;
            treshtml += "</tr>";
            reshtml += treshtml;
        }
    }
    if (reshtml.length == 0) {
        setNoneFound($table);
        return;
    }
    $("#error-handle").html("");
    $("#classcount").html(c-1-data["moved"].length);
    $results.html(reshtml);
    checkAbsents($table);
}

function appendRes($table, model, data) {
    data_on_table = [];
    selected={};
    var $results = $table.find("tbody");
    var heads = headers[model];
    updateHeader($table, model);
    var list = data[model + "s"];
    if (list.length == 0) {
        setNoneFound($table);
        return;
    }
    $("#error-handle").html("");
    var reshtml = "";
    for (var i = 0; i < list.length; i++) {
        li = list[i];
        data_on_table.push(li);
        treshtml = "<tr>";
        for (var j = 0; j < heads.length; j++) {
            treshtml += '<td>' + li[heads[j]["valuename"]] + '</td>';
        }
        treshtml += "<td>" + genCheckBox(i + 1) + "</td>";
        treshtml += "</tr>";
        reshtml += treshtml;
    }
    $results.html(reshtml);
}

function updateHeader($table, model, strInsteadOfCheck) {
    var $header = $table.find("thead");
    var $results = $table.find("tbody");
    var heads = headers[model];
    var hhtml = "";
    for (var i = 0; i < heads.length; i++) {
        hhtml += "<th>" + heads[i]["title"] + "</th>";
    }
    if(strInsteadOfCheck!=null){
        hhtml += "<th>" + strInsteadOfCheck + "</th>";

    }else{
        hhtml += "<th>" + genCheckBox(0, false, true) + "</th>";
    }
    $header.html(hhtml);
}

function logout() {
    eraseCookie("user");
    location.href = "LoginPage/LoginPage.html";
}