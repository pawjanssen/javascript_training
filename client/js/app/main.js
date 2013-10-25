define(['jquery', 'app/util/Settings'], function($, Settings) {
   $(document).ready(function (){
       $('title').text(Settings.pageTitle);
   });
});