function TodoView() {
}

TodoView.prototype.renderTemplate = function() {
    var _this = this;

     _this.todosDraggable();
}

TodoView.prototype.todosDraggable = function () {
    $("div.todoDrag").draggable({ revert: true ,
        helper: "clone"});
};

TodoView.prototype.gebruikersDroppable = function () {
    var _this = this;
    $("#gebruikerslijst li").droppable({
        hoverClass: "todoOverGebruiker",
        drop: function( event, ui ) {
            _this.todoStorageInstance.moveTodo($(this).attr("userid"), ui.draggable.attr("todoid"), function() {
                _this.renderSuccessMessage("Het assignen van de todo is gelukt");
            }, function(){
                _this.renderErrorMessage("Het assignen van de todo is mislukt");
            });
        }
    });
};