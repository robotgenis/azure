var matches = null;
var teams = null;

$(document).ready(function() {
    $.get(' sql', { cmd: 'matches' }, function(data) {
        matches = JSON.parse(data);
        $.get(' sql', { cmd: 'teams' }, function(data) {
            teams = JSON.parse(data);
            //console.log(teams);
            //console.log(matches);
            matchLoad();
        });
    });
});

function matchLoad(){
    var max = matches.length;
    for(i = 0; i < max - 1; i ++){
        for(k = i + 1; k < max; k++){
            if(matches[i][0] > matches[k][0]){
                var temp = matches[i];
                matches[i] = matches[k];
                matches[k] = temp;
            }
        }
    }
    var html = document.getElementById("matchList").innerHTML;
    var outHtml = "";
    for(match in matches){
        add = html;
        add = add.replace("99", matches[match][0]);
        add = add.replace("00001", matches[match][1]);
        add = add.replace("00002", matches[match][2]);
        add = add.replace("00003", matches[match][3]);
        add = add.replace("00004", matches[match][4]);
        outHtml += add;
    }
    document.getElementById("matchList").innerHTML = outHtml;
}