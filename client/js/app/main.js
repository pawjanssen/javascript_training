define(['jquery', 'jquery.bootstrap', 'app/util/Settings'], function($, Settings) {
   $(document).ready(function (){
       $("#myModal").load("todoTonenBewerken.html");
       $('title').text(Settings.pageTitle);
   });
});