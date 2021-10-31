const choices = ['rock', 'paper', 'scissors']
const win = ['rock-scissors', 'paper-rock', 'scissors-paper']
const lose = ['scissors-rock', 'rock-paper', 'paper-scissors']

const hands = document.querySelectorAll('.hand-box')
const humanChoiceBox = document.querySelector('.human-choice')
const robotChoiceBox = document.querySelector('.robot-choice')
const figto = document.querySelector('#fighto');
const roundWinner = document.querySelector('.round-winner')
const endgameModal = document.querySelector('#modal')
const overlay = document.querySelector('#overlay')
const tryAgainBtn = document.querySelector('#try-again-btn')
const score = document.querySelector('.score');
const gameResults = document.querySelector('#game-results')

let robotPoints = humanPoints = 0;

var humanChoice;

hands.forEach(hand => hand.addEventListener('click', ()  => {
    hands.forEach(nothand => nothand.classList.remove('click'));

    humanChoice = hand.getAttribute('id');

    humanChoiceBox.classList.remove(`fa-hand-paper`, 'fa-hand-scissors', 'fa-hand-rock');
    humanChoiceBox.classList.add('far', `fa-hand-${humanChoice}`, `hand-box`);
    
    hand.classList.add('click');
}));

figto.addEventListener('click', () => {
    gameLogic();
    score.textContent = `${humanPoints} : ${robotPoints}`;

    if (humanPoints === 3 || robotPoints === 3) {
        openEndgameModal();
    };
})

tryAgainBtn.addEventListener('click', () => {
    tryAgain();
})

function openEndgameModal() {
    endgameModal.classList.add('active')
    overlay.classList.add('active')
    if (humanPoints > robotPoints){
        gameResults.textContent = 'VICTORY!!!';
    }
    else{
        gameResults.textContent = 'DEFEAT!!!';
    }
}

function tryAgain() {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
    robotChoiceBox.classList.remove(`hand-box`, `fa-hand-paper`, 'fa-hand-scissors', 'fa-hand-rock');
    humanChoiceBox.classList.remove(`hand-box`, `fa-hand-paper`, 'fa-hand-scissors', 'fa-hand-rock'); 
    hands.forEach(hand => hand.classList.remove('click'));
    humanPoints = robotPoints = 0;
    humanChoice = undefined;
    roundWinner.textContent = '';
    score.textContent = `${humanPoints} : ${robotPoints}`;
}

function gameLogic() {
    robotChoice = choices[Math.floor(Math.random() * choices.length)];
    robotChoiceBox.classList.remove(`fa-hand-paper`, 'fa-hand-scissors', 'fa-hand-rock');
    robotChoiceBox.classList.add('far', 'hand-box', `fa-hand-${robotChoice}`);
    if (humanChoice === robotChoice) {
        roundWinner.textContent = `Tie round.`;
    }
    else if (win.includes(humanChoice + '-' + robotChoice)) {
        humanPoints++;
        roundWinner.textContent = `Human wins round.`;
    }
    else if (lose.includes(humanChoice + '-' +  robotChoice)) {
        robotPoints++;
        roundWinner.textContent = `Computer wins round.`;
    }
    else {
        robotChoiceBox.classList.remove(`hand-box`, `fa-hand-paper`, 'fa-hand-scissors', 'fa-hand-rock');
        roundWinner.textContent = 'Please make your choice.';
    }
}