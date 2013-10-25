define(['jquery', 'app/util/Settings', 'bootstrap'], function($, Settings) {
   $(document).ready(function (){
       $("#myModal").load("todoTonenBewerken.html");
       $('title').text(Settings.pageTitle);
   });
});