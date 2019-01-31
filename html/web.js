$(document).ready(function() {
    $.get('login', function(data, status){
         document.getElementById('login').innerHTML = data
    });
});