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
    ]};


function genCheckBox(num, disable) {
    return "<div class='checkboxp'><input type='checkbox' value='None' name='check' id='checkbox" + num + "' "
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
            console.log(err);
        }
    });
}

function appendHRRes($table, data) {
    var model = "student";
    var types = ["moved:pink", "default:lightgray", "new:lightgreen"];
    var $results = $table.find("tbody");
    var heads = headers[model];
    updateHeader($table, model, "Absent");
    var reshtml = "";
    var c = 1;
    for (var k = 0; k < types.length; k++) {
        var ps = types[k].split(":");
        var sect = data[ps[0]];
        for (var i = 0; i < sect.length; i++) {
            li = sect[i];
            treshtml = "<tr style='background-color: "+ps[1]+"'>";
            for (var j = 0; j < heads.length; j++) {
                treshtml += '<td>' + li[heads[j]["valuename"]] + '</td>';
            }
            treshtml += "<td>" + genCheckBox(c, ps[0]=="moved") + "</td>";
            c+=1
            treshtml += "</tr>";
            reshtml += treshtml;
        }
    }
    $results.html(reshtml);
}

function appendRes($table, model, data) {
    var $results = $table.find("tbody");
    var heads = headers[model];
    updateHeader($table, model);
    var list = data[model + "s"];
    if (list.length == 0) {
        $results.html('<div id="none-found-wrapper">
                        <div class="alert alert-warning" role="alert">
                            <span class="glyphicon glyphicon-question-sign" aria-hidden="true">

                            </span>
                               No Results Found
                         </div>
                    </div>');
        return;
    }
    var reshtml = "";
    for (var i = 0; i < list.length; i++) {
        li = list[i];
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
        hhtml += "<th>" + genCheckBox(0) + "</th>";
    }
    $header.html(hhtml);
}

function logout() {
    eraseCookie("user");
    location.href = "LoginPage/LoginPage.html";
}