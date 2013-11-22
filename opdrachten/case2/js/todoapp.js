// Event handler die bij het laden van de pagina wordt uitgevoerd
window.addEventListener("load", function() {
    // TODO-OPDRACHT-1 - Selecteer de gebruikersdropdown selectbox, zodat daar de gebruiker "J. Script" aan kan worden toegevoegd
    var gebruikersSelect = undefined;

    if (gebruikersSelect) {
        var option = document.createElement("option");
        option.text = "J. Script";
        gebruikersSelect.add(option);
    }

    // TODO-OPDRACHT-1 - Selecteer de button met de cssClass "selecteerGebruiker"
    var gebruikerSelecteerButton = undefined;

    // TODO-OPDRACHT-1 - Zorg ervoor dat achter de huidige tekst op de knop ook de tekst "gebruiker" komt te staan.
    // Dus ipv "Selecteer" "Selecteer gebruiker".

    // TODO-OPDRACHT-1 - Zorg ervoor dat ieder element die de class "toBeCopyrighted" heeft, een copyright symbool achter de reeds bestaande tekst krijgt (©)
    var toBeCopyrightedVelden = undefined;

    // TODO-OPDRACHT-1 - Zorg ervoor dat alle menuitems, behalve degene met de class "current_page_item" verwijderd worden
    var inactieveMenuItems = undefined;

    // TODO-OPDRACHT-2 - Verander de tekst van de default option uit de selectlijst naar "Selecteer een gebruiker...".
    // De default option heeft als value "defaultOption". Hint, de value is een attribuut

    // TODO-OPDRACHT-2 - Verwijder uit de selectlijst alle niet default options. De default option heeft als value "defaultOption".
    var nietDefaultOptions = undefined;

    // TODO-OPDRACHT-2 - Schrijf de eerder gemaakte for loops om, en maak gebruik van de Array methode forEach
});