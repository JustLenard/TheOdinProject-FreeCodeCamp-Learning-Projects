import random

choices = ['Rock', 'Paper', 'Scissors']
win = [('Rock', 'Scissors'), ('Paper', 'Rock'), ('Scissors', 'Paper')]

# human = input().lower().capitalize()
# computer = random.choice(choices)
# print(f"Computer's choice:", computer)

computer_points = human_points = 0

for x in range(5):
    human = input().lower().capitalize()
    computer = random.choice(choices)
    print(f"Computer's choice: {computer}")
    if human == computer:
        print(f"Tie round. {human_points}:{computer_points}")
    elif (human, computer) in win:
        human_points += 1
        print(f'Human wins round. {human_points}:{computer_points}')
    else:
        computer_points += 1
        print(f'Computer wins round. {human_points}:{computer_points}')

