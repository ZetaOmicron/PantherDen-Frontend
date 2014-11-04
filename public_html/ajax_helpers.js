var server_location ="http://localhost:8000/";

function appendSearchResults($table, $searchtable, model, field, query, page){
    var req = $.ajax({
        type:'GET',
        url: server_location+model+'/search/?f='+field+'&q='+query+'&p='+page,
        dataType: 'json',
        success: function (data) {
            appendRes($table, $searchtable, model, data);
        },
        error: function(err){
            console.log(err);
        }
    });
}

function appendRes($table, $searchtable, model, data){
    console.log(data);
    list = data[model + "s"];
    reshtml = "";
    for (var i = 0; i < list.length; i++) {
        li = list[i];
        treshtml = "<tr>";
        treshtml += '<td>' + li['id'] + '</td>';
        treshtml += '<td>' + li['lastname'] + '</td>';
        treshtml += '<td>' + li['firstname'] + '</td>';
        treshtml += '<td>' + li['homeroomid'] + '</td>';
        treshtml += "</tr>";
        reshtml += treshtml;
    }
    $searchtable.html(reshtml);
    //TODO: Fix things below
    $table.append(data["amount"]);
    $table.append(data["page"]);
}