import random

choices = ['Rock', 'Paper', 'Scissors']
win = [('Rock', 'Scissors'), ('Paper', 'Rock'), ('Scissors', 'Paper')]
lose = [('Scissors', 'Rock'), ('Rock', 'Paper'), ('Paper', 'Scissors')]

computer_points = human_points = 0

game_round = 1
while game_round <= 5:
    human = input().lower().capitalize()
    computer = random.choice(choices)
    print(f"Computer's choice: {computer}")
    if human == computer:
        game_round += 1
        print(f"Tie round. {human_points}:{computer_points}")
    elif (human, computer) in win:
        game_round += 1
        human_points += 1
        print(f'Human wins round. {human_points}:{computer_points}')
    elif (human, computer) in lose:
        game_round += 1
        computer_points += 1
        print(f'Computer wins round. {human_points}:{computer_points}')
    else:
        print("Invalid choice. Please type: 'Rock', 'Paper', or 'Scissors'")
        game_round -= 1

print(f'\nFinal score is: {human_points}:{computer_points}')
if human_points == computer_points:
    print("It's a tie")
elif human_points > computer_points:
    print('Human wins')
else:
    print('Computer wins')
