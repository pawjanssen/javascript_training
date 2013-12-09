function TodoView() {
}

TodoView.prototype.renderTemplate = function() {
    var _this = this;

     _this.todosDraggable();
}

TodoView.prototype.todosDraggable = function () {
    $("div.todoDrag").draggable({         });

    $("div.todoDragInContainer").draggable({ revert: true ,
        containment: ".dragContainer",
        helper: "clone"});
};

TodoView.prototype.gebruikersDroppable = function () {
    $("#gebruikerslijst li").droppable({
        hoverClass: "todoOverGebruiker",
        drop: function( event, ui ) {
            console.log(this);
        }
    });
};