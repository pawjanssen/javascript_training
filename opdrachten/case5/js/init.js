var todoViewInstance = new TodoView();

window.addEventListener("load", function() {
    todoViewInstance.todosDraggable();
    todoViewInstance.gebruikersDroppable();
});