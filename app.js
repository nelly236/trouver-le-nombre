// éléments du DOM.
// variables
const divVies = document.querySelector('.vies'); /*querySelector permet de récupérer un élément dans une balise comme en css*/
const message = document.getElementById('message'); /* je rappelle mon id de mon html*/
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];

// Modèle de heart.
const coeurVide = '<ion-icon name="heart-outline"></ion-icon>';
const coeurPlein = '<ion-icon name="heart"></ion-icon>';

//Fond.
const bgFroid = 'linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)';
const bgTiede = 'linear-gradient(to right, #fa709a 0%, #fee140 100%)';
const bgChaud = 'linear-gradient(to right, #fa709a 0%, #fee140 100%)';
const bgBrulant = 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)';

const bgWin = 'linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)';
const bgLoose = 'linear-gradient(60deg, #29323c 0%, #485563 100%)';

// PLAY :
const play = () => {

    // nombre aléatoire
    const randomNumber = Math.floor(Math.random() * 101); /* chiffre compris entre 0 et 100 */
    const totalVies = 5; /* mettre le nombre de vies que l'on souhaite */
    //let vies = totalVies;
    let vies = 5;
    console.log(randomNumber); /* permet de voir dans la console si tout va bien */

    //Actualisation à chaque essai - TOUTE LA LOGIQUE
    formulaire.addEventListener('submit', (e) => { /* permet d'éxécuter une fonction*/
        e.preventDefault();
        const valeurInput = parseInt(input.value); /* parseInt permet de converti la valeur texte en chiffre */

        if(valeurInput < 0 || valeurInput > 100) return; /* si la valeur de Input est inférieur à 0, ||(ou) la valeur Input est supérieur à 100, return arrête tous à partir d'ici il stop le code */
    
        if(valeurInput === randomNumber){  /* === veut dire si la valeurInput est égale à randomNumber*/
            body.style.backgroundImage = bgWin; /* si l'utilisateur trouve le bon nombre cela va changer le style du fond d'écran */ 
            message.textContent = `BRAVO !!! Le nombre était bien ${randomNumber}`;  /* change le message*/
            rejouerBtn.style.display = "block";
            essayerBtn.setAttribute("disabled", "");
        }

        if(valeurInput !== randomNumber) {
            /* on fixe une intervalle */
            // 1ère option :
            /*(NombreAléatoire <= valeurInput + 10) && (randomNumber >= valeurInput - 10);*/
            /* le nombre aléatoire va être inférieur ou égale à la valeurInput + 10, et en même temps le nombre aléatoire doit être supérieur à la valeurInput - 10 */
             /* exemple: 58 inférieur ou égal à 74 et 58 supérieur ou égal à 54 */

            // deuxième option :
            /*(NombreAléatoire < valeurInput + 11) && (randomNumber > valeurInput - 11);*/
            /* écriture en valeur absolues on rajoute 1(au chiffre 10)*/
            /* exemple: 58 inférieur à 75 et 58 supérieur à 53 */
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput - 3){
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est Brûlant !!! 🔥🔥🔥 ";
            } else if(randomNumber < valeurInput + 6 && randomNumber > valeurInput - 6){
              /* si c'est pas brûlant ça peut-être chaud*/
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est Chaud ! 🔥 ";
            } else if(randomNumber < valeurInput + 11 && randomNumber > valeurInput - 11){
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est Tiede 😐 ";
            } else{
                body.style.backgroundImage = bgFroid;
                message.textContent = "C'est Froid ❄️ ";
            }
            vies--; /* enlève la vie */
            verifyLoose(); /* vérifie si le nombre de vie est égale à 0, si on n'a pas perdu */            
        }

        actualiseCoeurs(vies);
    })

    const verifyLoose = () => {
        if(vies === 0){
        body.style.backgroundImage = bgLoose; 
        body.style.color = '#990000'; /* change la couleur du texte en rouge */  
        essayerBtn.setAttribute("disabled", "")  /* on bloque le bouton en le désactivant pour ne plus autorisé le joueur à envoyer un nombre */
                      /* désactive le bouton et on laisse l'autre vide pour aucune valeur */
        message.textContent = `Vous avez perdu. La réponse était ${randomNumber}`;
        rejouerBtn.style.display = "block"; /* le bouton permet de rejouer */
        }
    }

    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = ""; /* permet de réinitialiser */
        let tableauDeVies = [];
        for(let i = 0; i < vies; i++){
            tableauDeVies.push(coeurPlein);
        }
        for(let i = 0; i < totalVies - vies; i++){
            tableauDeVies.push(coeurVide);
        }
        tableauDeVies.forEach(coeur =>{
            divVies.innerHTML += coeur; /* += permet de rajouter en plus à chaque coeur */
        })
    }
    actualiseCoeurs(vies); /* pour le début du jeu */

    rejouerBtn.addEventListener('click', () => {
        message.style.display = 'none'; /* enlève le message */
        document.location.reload(true); /* recharge la page dès que le bouton apparaît */
    })
}

play();