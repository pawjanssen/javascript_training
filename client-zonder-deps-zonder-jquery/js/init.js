NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

var settingsInstance = {
    currentUser: null,
    loadTemplate: function(templateElement, template, successCallBack) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200)
            {
                templateElement.innerHTML = request.responseText;
                successCallBack.call();
            }
        };

        request.open("GET", template, true);
        request.send();
    },
    getJSON: function(url, successCallBack, failCallBack) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    successCallBack.call(window, JSON.parse(request.responseText));
                } else {
                    failCallBack.call();
                }
            }
        };

        request.open("GET", url, true);
        request.send();
    },
    sendJSONToServer: function(method, url, data, successCallBack, failCallBack) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    successCallBack.call(window, JSON.parse(request.responseText));
                } else {
                    failCallBack.call();
                }
            }
        };

        request.open(method, url, true);
        request.setRequestHeader("Content-Type", "application/json");

        request.send(JSON.stringify(data));
    }
};

var gebruikerStorageInstance = new GebruikerStorage(settingsInstance);
var todoStorageInstance = new TodoStorage(settingsInstance);
var gebruikerSelectieViewInstance = new GebruikerSelectieView(gebruikerStorageInstance, settingsInstance);
var todoViewInstance = new TodoView(todoStorageInstance, gebruikerStorageInstance);
var gebruikersViewInstance = new GebruikersView(gebruikerStorageInstance);

var ws = new WebSocket('ws://localhost:8001');

ws.onopen = function(evt) {
    console.log('connectie geopend');
};

ws.onmessage = function(websocketEvent) {
    var websocketData = JSON.parse(websocketEvent.data);
    if (websocketData.eventtype === "gebruiker-todos" &&
        websocketData.gebruikerid == settingsInstance.currentUser) {

        todoViewInstance.renderTodos(websocketData.data);
    }
};

function loadView(historyState, doSetState) {
    if (doSetState) {
        history.pushState(historyState, null, '#' + historyState.id);
    }
    switch (historyState.id) {
        case 'todos':
            todoViewInstance.renderTemplate();
            break;
        case 'gebruikers':
            gebruikersViewInstance.renderTemplate();
            break;
        case 'gebruikerselectie':
            gebruikerSelectieViewInstance.renderTemplate();
            break;
    }
};

// Object met configuratie voor de history states
var historyState = {
    todos: {
        id: 'todos'
    },
    gebruikers: {
        id: 'gebruikers'
    },
    gebruikerselectie: {
        id: 'gebruikerselectie'
    }
};

window.addEventListener("load", function() {

    // Popstate event wordt door de browser afgevuurd bij een history even (browser back buttons)
    window.addEventListener ('popstate', function (event) {
        loadView(history.state, false);
    });

    document.getElementById("gebruikers").addEventListener("click", function(event){
        event.preventDefault();
        loadView(historyState.gebruikers, true);
    });

    document.getElementById("todos").addEventListener("click", function(event){
        event.preventDefault ();
        loadView(historyState.todos, true);
    });

    // Controleer of bij initiele load een hash met pagina id is gevuld, zo ja, load die controller, anders de default
    if (location.hash !== '' && settingsInstance.currentUser != null) {
        loadView(historyState[location.hash.replace("#","")], true);
    } else {
        loadView(historyState.gebruikerselectie, true);
    }
});
