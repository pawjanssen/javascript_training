define(['app/util/Settings', 'jquery', 'jquery.bootstrap', 'jquery-ui'], function(Settings, $) {

    function TodoView(todoController) {
        this.todoController = todoController
        _this = this;
    }

    TodoView.prototype.renderTemplate = function(callBackWhenReady) {
        $('#pageTitle').text("TodoList");
//        var _this = this;
        $('#page').load("todoPage.html", function() {
            _this.clickhandlersToepassen();
            callBackWhenReady.call();
        });
        $('#myModal').load("todoTonenBewerken.html");
    }

    TodoView.prototype.renderTodos = function(todos) {
        var templateLI = $("#todolijst li:first").clone();
        $("#todolijst").empty();
        $.map(todos, function (value, index) {
            var liClone = templateLI.clone();
            liClone.find("span.todoTitle").text(value.titel);
            liClone.find("span.todoCreated").text(liClone.find("span.todoCreated").text() + value.created);
            liClone.find("div.alert").addClass(value.priority).attr("todoid", value.id);
            liClone.appendTo("#todolijst");
        });
        _this.todosDraggable();
    }

    TodoView.prototype.renderGebruikers = function(gebruikers) {
        var templateLI = $("#gebruikerslijst li:first").clone();
        $("#gebruikerslijst").empty();
        $.map(gebruikers, function (value, index) {
            var liClone = templateLI.clone();
            liClone.find("span.naam").text(value.naam);
            liClone.find("span.gebruikersnaam").text(value.gebruikersnaam);
            liClone.attr("userid", value.id);
            liClone.appendTo("#gebruikerslijst");
            _this.gebruikersDroppable();
        })
    }

    TodoView.prototype.renderError = function() {

    }

    TodoView.prototype.clickhandlersToepassen = function () {}

    TodoView.prototype.todosDraggable = function () {
        $("div.todoDrag").draggable({ revert: true ,
                                     helper: "clone"});
    }

    TodoView.prototype.gebruikersDroppable = function () {
        $("#gebruikerslijst li").droppable({
            hoverClass: "todoOverGebruiker",
            drop: function( event, ui ) {
                _this.todoController.moveTodo($(this).attr("userid"), ui.draggable.attr("todoid"));
            }
        });
    }

    var todoViewInstance = new TodoView(undefined);

    return {
        renderTemplate: function(todoController, callBackWhenReady) {
            todoViewInstance = new TodoView(todoController);
            todoViewInstance.renderTemplate(callBackWhenReady);
        },

        renderTodos: todoViewInstance.renderTodos,

        renderGebruikers: todoViewInstance.renderGebruikers,

        renderError: todoViewInstance.renderError
    };
});