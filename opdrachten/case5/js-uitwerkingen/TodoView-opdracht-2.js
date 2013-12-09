function TodoView() {
}

TodoView.prototype.renderTemplate = function() {
    var _this = this;

     _this.todosDraggable();
}

TodoView.prototype.todosDraggable = function () {
    $("div.todoDrag").draggable({ revert: true ,
        helper: "clone"
    });
};

TodoView.prototype.gebruikersDroppable = function () {
    $("#gebruikerslijst li").droppable({
        hoverClass: "todoOverGebruiker",
        drop: function( event, ui ) {
            console.log(this);
        }
    });
};

TodoView.prototype.clickhandlersTodoPageToepassen = function () {
    $("a.nieuwetodo").click(function() {
        var _this = this;
        var liClone = $("#todolijst li.clonable").clone();
        liClone.find("span.todoTitle").text("nieuwe todo");
        liClone.find("span.todoCreated").text(liClone.find("span.todoCreated").text("Vandaag"));
        liClone.removeClass("clonable")
        liClone.appendTo("#todolijst");
        _this.todosDraggable();
    });
};

