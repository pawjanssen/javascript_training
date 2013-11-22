// Event handler die bij het laden van de pagina wordt uitgevoerd
window.addEventListener("load", function() {
    // TODO-OPDRACHT-1 - Selecteer de gebruikersdropdown selectbox, zodat daar de gebruiker "J. Script" aan kan worden toegevoegd
    var gebruikersSelect = document.getElementById("gebruikersdropdown");

    if (gebruikersSelect) {
        var option = document.createElement("option");
        option.text = "J. Script";
        gebruikersSelect.add(option);
    }

    // TODO-OPDRACHT-1 - Selecteer de button met de cssClass "selecteerGebruiker"
    var gebruikerSelecteerButton = document.querySelector("button.selecteerGebruiker");

    // TODO-OPDRACHT-1 - Zorg ervoor dat achter de huidige tekst op de knop ook de tekst "gebruiker" komt te staan.
    // Dus ipv "Selecteer" "Selecteer gebruiker".
    gebruikerSelecteerButton.innerHTML += " gebruiker";

    // TODO-OPDRACHT-1 - Zorg ervoor dat ieder element die de class "toBeCopyrighted" heeft, een copyright symbool achter de reeds bestaande tekst krijgt (©)
    var toBeCopyrightedVelden = document.getElementsByClassName("toBeCopyrighted");

    for (var i1 = 0, len1 = toBeCopyrightedVelden.length; i1 < len1; i1++) {
        toBeCopyrightedVelden[i1].innerHTML += "©";
    }

    /*Array.prototype.forEach.call(toBeCopyrightedVelden, (function(node) {
        node.innerHTML += "©";
    }));*/

    // TODO-OPDRACHT-1 - Zorg ervoor dat alle menuitems, behalve degene met de class "current_page_item" verwijderd worden
    var inactieveMenuItems = document.querySelectorAll("#menu ul li:not(.current_page_item)");

    for (var i2 = 0, len2 = inactieveMenuItems.length; i2 < len2; i2++) {
        inactieveMenuItems[i2].parentNode.removeChild(inactieveMenuItems[i2]);
    }

    /*Array.prototype.forEach.call(inactieveMenuItems, (function(node) {
        node.parentNode.removeChild(node);
    }));*/

    // TODO-OPDRACHT-2 - Verander de tekst van de default option uit de selectlijst naar "Selecteer een gebruiker...".
    // De default option heeft als value "defaultOption". Hint, de value is een attribuut
    document.querySelector("#gebruikersdropdown option[value='defaultOption']").innerHTML = "Selecteer een gebruiker...";

    // TODO-OPDRACHT-2 - Verwijder uit de selectlijst alle niet default options. De default option heeft als value "defaultOption".
    var nietDefaultOptions = document.querySelectorAll("#gebruikersdropdown option:not([value='defaultOption'])");
    for (var i3 = 0, len3 = nietDefaultOptions.length; i3 < len3; i3++) {
        nietDefaultOptions[i3].parentNode.removeChild(nietDefaultOptions[i3]);
    }

    /*Array.prototype.forEach.call(nietDefaultOptions, (function(node) {
        node.parentNode.removeChild(node);
    }));*/

    // TODO-OPDRACHT-2 - Schrijf de eerder gemaakte for loops om, en maak gebruik van de Array methode forEach, zie hierboven uitgecommentarieerd.
});