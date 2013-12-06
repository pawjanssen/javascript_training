function TodoView() {
}

TodoView.prototype.renderTemplate = function() {
    var _this = this;

     _this.todosDraggable();
}

TodoView.prototype.todosDraggable = function () {
    $("div.todoDrag.high").draggable({ revert: true ,
        helper: "clone"});

    $("div.todoDrag.low").draggable({ revert: true ,
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