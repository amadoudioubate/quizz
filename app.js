//Selection du formulaire
const formQuizz = document.querySelector('.quiz_form');
let arrayResults = []; // Tableau qui contiendra le resultat
const response = ['c', 'a', 'b', 'a', 'c'] // Tableau des bonnes reponses
const emojis = ['✔️','✨','👀','😭','👎']; // Tableau Emojis
let verifTableau = []; // Tableau boolean pour la véracité des resultats
const titleResult = document.querySelector('.quiz_res h2'); // Titre resultat
const aideResult = document.querySelector('.aide');
const noteResult = document.querySelector('.note');
const allQuestions = document.querySelectorAll('.form_question');


formQuizz.addEventListener('submit', (e) => { // Quand le formulaire est envoyé
    e.preventDefault(); // Pour eviter rechargement de la page

    for(let i=1; i<=5; i++) { 
        arrayResults.push(document.querySelector(`input[name="q${i}"]:checked`).value)
    }
    // console.log(arrayResults);
    // console.log(response);
    // console.log(arrayResult);
    // if(arrayResult.length === response.length) {
    //     let res = arrayResult.join('')
    //     let rep = response.join('')
    //     console.log(res);
    //     console.log(rep);
    //     if(res === rep) {
    //         formQuizz.classList.remove('echec')
    //         formQuizz.classList.add('success')
    //     } else {
    //         formQuizz.classList.remove('success')
    //         formQuizz.classList.add('echec')
    //     }

    // }
    verifTableauResult(arrayResults);
    arrayResults = [];
    
});

/**
 * Verifie resultats
 * @param {Object} arrResults tableau
 */
function verifTableauResult(arrResults) {

    for(let i=0; i<arrResults.length; i++) {
        
        if(arrResults[i] === response[i]) {
            verifTableau.push(true)
        } else {
            verifTableau.push(false)
        }
    }
    //console.log(verifTableau);
    showResult(verifTableau);
    colorsResult(verifTableau);
    verifTableau = [];
}

/**
 * Afficher resultats
 * @param {Object} arrCheck (tableau)
 */
function showResult(arrCheck) {
    // Nombre de fautes
    const nbFautes = arrCheck.filter(el => el !== true).length;
    switch(nbFautes) {
        case 0 :
            titleResult.innerText = `✔️ Bravo, c'est sans faute ! ✔️ `;
            aideResult.innerText = '';
            noteResult.innerText = '5/5';
            break;
        case 1:
            titleResult.innerText = `✨ Vous y êtes presque ! ✨`
            aideResult.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !'
            noteResult.innerText = '4/5'
            break;
        case 2:
            titleResult.innerText = `✨ Encore un effort ... 👀`
            aideResult.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResult.innerText = '3/5'
            break;
        case 3:
            titleResult.innerText = `👀 Il reste quelques erreurs. 😭`
            aideResult.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResult.innerText = '2/5'
            break;
        case 4:
            titleResult.innerText = `😭 Peux mieux faire ! 😭`
            aideResult.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResult.innerText = '1/5'
            break;
        case 5:
            titleResult.innerText = `👎 Peux mieux faire ! 👎`
            aideResult.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResult.innerText = '0/5'
        break;

        default:
            'Wops, cas innatendu.';
    }
}

/**
 * Mettre les coleurs sur bloc question en fonction des resultats
 * @param {Object} arrVerifBoolean 
 */
function colorsResult(arrVerifBoolean) {

    for(let i = 0; i < arrVerifBoolean.length; i++) {

        if(arrVerifBoolean[i] === true) {
            allQuestions[i].style.background = 'lightgreen';
        } else {
            allQuestions[i].style.background = '#ffb8b8';
            allQuestions[i].classList.add('echec');

            setTimeout(() => {
                allQuestions[i].classList.remove('echec');
            }, 500)
        }
    }
}

allQuestions.forEach(elem => {
    elem.addEventListener('click', () => {
        elem.style.background = 'white';
    })  
})
