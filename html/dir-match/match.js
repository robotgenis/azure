var matches = null;
var teams = null;

$(document).ready(function() {
    $.get(' sql', { cmd: 'matches' }, function(data) {
        matches = JSON.parse(data);
        $.get(' sql', { cmd: 'teams' }, function(data) {
            teams = JSON.parse(data);
        });
    });
});