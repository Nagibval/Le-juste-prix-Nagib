// Génère un nombre aléatoire entre 1 et 10000
const justePrix = Math.floor(Math.random() * 10000) + 1;

// Sélection des éléments HTML
const propositionInput = document.getElementById("devinez");
const validerButton = document.getElementById("valider");
const feedback = document.getElementById("feedback");
const tentativesDisplay = document.getElementById("tentatives");
const rejouerButton = document.getElementById("rejouer");

let tentatives = 10;

// Ajoute un événement au bouton "Valider"
validerButton.addEventListener("click", () => {
    const proposition = parseInt(propositionInput.value);

    // Vérifie si l'entrée est un nombre valide
    if (isNaN(proposition) || proposition < 1 || proposition > 10000) {
        feedback.textContent = "Veuillez entrer un nombre valide entre 1 et 10000.";
        feedback.className = "";
        return;
    }

    // Réduit le nombre de tentatives
    tentatives--;

    // Vérifie si la proposition est correcte
    if (proposition === justePrix) {
        feedback.textContent = "Bravo, vous avez trouvé le juste prix !";
        feedback.className = "gagne";
        finDeJeu(true);
    } else if (proposition < justePrix) {
        feedback.textContent = "C'est plus !";
        feedback.className = "plus";
    } else {
        feedback.textContent = "C'est moins !";
        feedback.className = "moins";
    }

    // Met à jour les tentatives restantes
    tentativesDisplay.textContent = `Nombre d'essais restants : ${tentatives}`;

    // Vérifie si le joueur a épuisé ses tentatives
    if (tentatives === 0) {
        feedback.textContent = `Vous avez perdu ! Le juste prix était ${justePrix}.`;
        feedback.className = "perdu";
        finDeJeu(false);
    }
});

// Fonction pour terminer le jeu
function finDeJeu(gagne) {
    propositionInput.disabled = true;
    validerButton.disabled = true;
    rejouerButton.style.display = "block";

    if (gagne) {
        feedback.textContent += " Félicitations !";
    }
}

// Ajoute un événement au bouton "Rejouer"
rejouerButton.addEventListener("click", () => {
    // Réinitialise le jeu
    tentatives = 10;
    propositionInput.disabled = false;
    validerButton.disabled = false;
    feedback.textContent = "";
    feedback.className = "";
    tentativesDisplay.textContent = `Nombre d'essais restants : ${tentatives}`;
    propositionInput.value = "";
    rejouerButton.style.display = "none";
    // Génère un nouveau juste prix
    justePrix = Math.floor(Math.random() * 10000) + 1;
});
