// Ecoute le changement de taille de la fenêtre.
window.addEventListener('resize', conditionMenu)


// Vérifie la taille de la fenêtre avant découter le click sur le bouton menu.
function conditionMenu() {
    var elementBtn = document.getElementById('nav-btn');
    var elementNav = document.getElementById('nav-item');
    var windowWidth = window.innerWidth;
    if (windowWidth <= 600){
        elementNav.style.display = 'none';
        elementBtn.addEventListener('click', menuDeroulant);
    } else {
        // Permet de garder le menu apparant lorsque l'on repasse à une taille de fenêtre > 600px.
        elementNav.style.display = 'flex';
    }
}


// Fait apparaître les liens de navigation lors de l'appui sur le bouton menu.
function menuDeroulant(elementNav) {
    var elementNav = document.getElementById('nav-item');
    var etat = elementNav.style.display;
    if (etat == 'flex') {
        elementNav.style.display = 'none';
    } else {
        elementNav.style.display = 'flex';
    };
};