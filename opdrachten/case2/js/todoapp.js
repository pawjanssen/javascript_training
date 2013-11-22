// Event handler die bij het laden van de pagina wordt uitgevoerd
window.addEventListener("load", function() {
    // TODO - Selecteer de gebruikersdropdown selectbox
    var gebruikersSelect = document.getElementById("gebruikersdropdown");

    var option = document.createElement("option");
    option.text = "J. Script";
    gebruikersSelect.add(option);

    // TODO - Selecteer de button met de cssClass "selecteerGebruiker"
    var gebruikerSelecteerButton = document.querySelector("button.selecteerGebruiker");

    // TODO - Zorg ervoor dat achter de huidige tekst op de knop ook de tekst "gebruiker" komt te staan.
    // Dus ipv "Selecteer" "Selecteer gebruiker".
});