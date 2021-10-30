const choices = ['rock', 'paper', 'scissors']
const win = ['rock-scissors', 'paper-rock', 'scissors-paper']
const lose = ['scissors-rock', 'rock-paper', 'paper-scissors']

const hands = document.querySelectorAll('.hand-box')
const humanChoiceBox = document.querySelector('.human-choice')
const robotChoiceBox = document.querySelector('.robot-choice')
const figto = document.querySelector('#fighto');

let robotPoints = humanPoints = 0;
let score = document.querySelector('.score');
var humanChoice;

hands.forEach(hand => hand.addEventListener('click', ()  => {
    hands.forEach(nothand => nothand.classList.remove('click'));
//    humanChoiceBox.setAttribute('id', 'human-choice');
//    const container = humanChoiceBox.createElement('i')
//    container.classList.add('far fa-hand-paper')
    humanChoice = hand.getAttribute('id');
    console.log(`Inside Function ${humanChoice}`);
    humanChoiceBox.classList.remove(`fa-hand-paper`, 'fa-hand-scissors', 'fa-hand-rock');
    humanChoiceBox.classList.add('far', `fa-hand-${humanChoice}`, `hand-box`);
    
    hand.classList.add('click');
}));

figto.addEventListener('click', () => {
//    let humanChoice = document.querySelector('.human-choice').getAttribute('id');

//    humanChoiceBox.classList.remove(`fa-hand-paper`, 'fa-hand-scissors', 'fa-hand-rock', 'hand-box');
//    robotChoiceBox.classList.remove(`fa-hand-paper`, 'fa-hand-scissors', 'fa-hand-rock', 'hand-box')

    console.log(humanChoice)
    let robotChoice = choices[Math.floor(Math.random() * choices.length)]
    console.log(`Robot Choice ${robotChoice}`);
    robotChoiceBox.classList.remove(`fa-hand-paper`, 'fa-hand-scissors', 'fa-hand-rock');
    robotChoiceBox.classList.add('far', 'hand-box', `fa-hand-${robotChoice}`);

    
    if (humanChoice === robotChoice){
        console.log(`Tie round. The score is ${humanPoints}:${robotPoints}`)
    }
    else if (win.includes(humanChoice + '-' + robotChoice)) {
        humanPoints++;
        console.log(`Human wins round. The score is ${humanPoints}:${robotPoints}`);
    }
    else if (lose.includes(humanChoice + '-' +  robotChoice)){
        robotPoints++;
        console.log(`Computer wins round. The score is ${humanPoints}:${robotPoints}`);
    }
    else {
        console.log("Please type 'Rock', 'Paper', or 'Scissors'.");
        
    }

    score.textContent = `${humanPoints} : ${robotPoints}`;
})