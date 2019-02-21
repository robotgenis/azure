$(document).ready(function() {
    setTab("login");
});

function setTab(name){
    var tabcontent = document.getElementsByClassName("tab");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    document.getElementById(name).style.display = "block";

    document.body.scrollTop = 0;
}

// $(window).bind('beforeunload', function(){
//   return 'Are you sure you want to leave?';
// });
