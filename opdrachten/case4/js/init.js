var todoViewInstance = new TodoView();

window.addEventListener("load", function() {
    todoViewInstance.renderTodos(todos);
    todoViewInstance.renderGebruikers(gebruikers);
});
