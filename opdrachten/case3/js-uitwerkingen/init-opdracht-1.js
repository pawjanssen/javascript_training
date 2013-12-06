var todoViewInstance = new TodoView();

// Uitwerking Opdracht 1, met onLoad eventlistener (javascript in template wordt in de head geladen)
window.addEventListener("load", function() {
    todoViewInstance.renderTodos(todos);
    todoViewInstance.renderGebruikers(gebruikers);
});

