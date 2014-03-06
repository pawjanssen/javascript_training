function TodoView() {
}

TodoView.prototype.renderTemplate = function() {
    var _this = this;

}

TodoView.prototype.renderTodos = function(todos) {
    var _this = this;
    var templateLI = $("#todolijst li.clonable").clone();
    $("#todolijst li.todoLi").remove();
    $.map(todos, function (value, index) {
        var liClone = templateLI.clone();
        liClone.find("span.todoTitle").text(value.titel);
        liClone.find("span.todoCreated").text(liClone.find("span.todoCreated").text() + "vandaag");
        liClone.find("div.alert").addClass(value.priority).attr("todoid", value.id);
        liClone.removeClass("clonable").addClass("todoLi");
        liClone.appendTo("#todolijst");
    });
}

TodoView.prototype.eventHandlersTodoTonenBewerkenToepassen = function () {
    var _this = this;
    $('#myModal').on('show.bs.modal', function (e) {
        if ($(e.relatedTarget).attr('id') == "nieuweTodoLink") {
            delete _this.nieuweTodo;
        }

        $('#todoToevoegenBewerkenForm')[0].reset();
        _this.nieuweTodo = {};
    });

    $("#saveButton").click(function() {
        _this.nieuweTodo.titel = $('#todoTitle').val();
        _this.nieuweTodo.priority = $('#todoPriority').val();
        _this.nieuweTodo.description = $('#todoOmschrijving').val();
        delete _this.nieuweTodo.created;

        // nieuweTodo opslaan

        $('#myModal').modal('hide');
    });
};
