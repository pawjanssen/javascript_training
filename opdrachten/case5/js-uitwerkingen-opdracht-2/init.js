(function(DataModuleAPI, ViewModuleAPI){
    var todoViewInstance = new ViewModuleAPI.TodoView();
    todoViewInstance.renderTodos(DataModuleAPI.todos);
    todoViewInstance.renderGebruikers(DataModuleAPI.gebruikers);
}(DataModule, ViewModule));