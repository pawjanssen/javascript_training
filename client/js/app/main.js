define(['jquery', 'app/util/Settings', 'bootstrap.min'], function($, Settings) {
   $(document).ready(function (){
       $("#myModal").load("todoTonenBewerken.html");
       $('title').text(Settings.pageTitle);
   });
});