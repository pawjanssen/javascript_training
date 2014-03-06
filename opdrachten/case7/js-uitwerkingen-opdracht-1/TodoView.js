function TodoView() {
}

TodoView.prototype.renderTemplate = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 3) {
            document.getElementById('page').innerHTML = "Pagina laden"
            console.log("Pagina laden");
        }
        if (request.readyState == 4)
        {
            switch (request.status) {
                case 200:
                    document.getElementById('page').innerHTML = request.responseText;
                break;
                case 404:
                    document.getElementById('page').innerHTML = "Pagina niet gevonden"
                break;
            }
        } else if (request.readyState == 4 && request.status == 404) {

        }
    };
    request.open("GET", "todoPage.html", true);
    request.send();
};

