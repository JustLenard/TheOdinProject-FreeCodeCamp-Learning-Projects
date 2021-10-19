choices = ['Rock', 'Paper', 'Scissors']
win = [['Rock', 'Scissors'], ['Paper', 'Rock'], ['Scissors', 'Paper']]
lose = [['Scissors', 'Rock'], ['Rock', 'Paper'], ['Paper', 'Scissors']]

let computerChoice = choices[Math.floor(Math.random() * choices.length)]
//let humanChoice = prompt()

console.log(computerChoice)
console.log('Herro')
//console.log(humanChoice)

for (let i = 0; i < 5; i++){
    console.log('The for loop is working')
}

console.log(lose)

//console.lost(['Rock', 'Scissors'] === win[0])
console.log(win[0])

console.log([1, 2] === [1, 2])