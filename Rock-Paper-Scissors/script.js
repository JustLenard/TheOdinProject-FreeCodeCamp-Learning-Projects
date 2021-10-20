choices = ['Rock', 'Paper', 'Scissors']
win = ['RockScissors', 'PaperRock', 'ScissorsPaper']
lose = ['ScissorsRock', 'RockPaper', 'PaperRock']


let computerPoints = humanPoints = 0
for (i = 1; i < 6; i++){
    console.log(`Round: ${i}`)
    let computerChoice = choices[Math.floor(Math.random() * choices.length)]
    let humanChoice = prompt()
    console.log(`Computer choice is: ${computerChoice}`)
    if (humanChoice === computerChoice){
        console.log(`Tie round. The score is ${humanPoints}:${computerPoints}`)
    }
    else if (win.includes(humanChoice + computerChoice)) {
        humanPoints++;
        console.log(`Human wins round. The score is ${humanPoints}:${computerPoints}`);
    }
    else if (lose.includes(humanChoice + computerChoice)){
        computerPoints++;
        console.log(`Computer wins round. The score is ${humanPoints}:${computerPoints}`);
    }
    else {
        console.log("Please type 'Rock', 'Paper', or 'Scissors'.");
        i--;
    }
}

console.log(`Final Result: ${humanPoints}:${computerPoints}`)
if (humanPoints === computerPoints){
    console.log('The game is a tie.')
}
else if (humanPoints > computerPoints) {
    console.log('Human wins the Game')
}
else {
    console.log('Computer wins the Game')
}
