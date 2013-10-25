define(['app/util/Settings', 'jquery', 'jquery.bootstrap'], function(Settings, $) {
   $(document).ready(function (){
       $("#myModal").load("todoTonenBewerken.html");
       $('title').text(Settings.pageTitle);
   });
});