/*const paper = document.querySelector('#paper')

paper.addEventListener('click', function (e) {
    console.log(e);
    paper.classList.add('click');
});*/

const hands = document.querySelectorAll('.hand-box')
const humanChoice = document.querySelector('.human-choice')

hands.forEach(hand => hand.addEventListener('click', function (e) {
    hands.forEach(nothand => nothand.classList.remove('click'));
    console.log(e);
    humanChoice.setAttribute('id', 'human-choice')
    hand.classList.add('click');
}));