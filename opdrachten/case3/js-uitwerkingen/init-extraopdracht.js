// Uitwerking Extra opdracht, waarbij middels onderstaande javascript andere javascript files worden geladen

var body = document.querySelector("body");

var gebruikersScriptTag = document.createElement("script");
gebruikersScriptTag.setAttribute("type", "text/javascript");
gebruikersScriptTag.setAttribute("src", "js-uitwerkingen/gebruikers.js");

var todosScriptTag = document.createElement("script");
todosScriptTag.setAttribute("type", "text/javascript");
todosScriptTag.setAttribute("src", "js-uitwerkingen/todos.js");

var todoViewScriptTag = document.createElement("script");
todoViewScriptTag.setAttribute("type", "text/javascript");
todoViewScriptTag.setAttribute("src", "js-uitwerkingen/TodoView.js");

// Als TodoView.js geladen is, kunnen we de class die in die file staat pas instantieren
todoViewScriptTag.onload = function() {
    var todoViewInstance = new TodoView();

    // Als todos.js geladen is, kunnen we de todos die daarin staan pas renderen
    todosScriptTag.onload = function() {
        todoViewInstance.renderTodos(todos);
    };

    // Als gebruikers.js geladen is, kunnen we de gebruikers die daarin staan pas renderen
    gebruikersScriptTag.onload = function() {
        todoViewInstance.renderGebruikers(gebruikers);
    };

    // Voegt de todos.js en gebruikers.js aan de body toe, waardoor de browser deze bestanden gaat laden
    body.appendChild(todosScriptTag);
    body.appendChild(gebruikersScriptTag);
};

// Als dit initialisatiescript wordt uitgevoerd, starten we met het laden van TodoView.js
body.appendChild(todoViewScriptTag);
