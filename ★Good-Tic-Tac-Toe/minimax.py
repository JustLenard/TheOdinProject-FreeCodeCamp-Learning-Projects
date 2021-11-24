board = ['_' for x in range(9)]
win_conditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
player = 'x'
ai = 'o'

def print_board(board):
    print(f'{0} {1} {2}\n{3} {4} {5}\n{6} {7} {8}\n')
    print(f'{board[0]} {board[1]} {board[2]}\n{board[3]} {board[4]} {board[5]}\n{board[6]} {board[7]} {board[8]}\n')


def check_empty(board):
    for postion in board:
        if postion == '_':
            return True
    return False

def check_win(board):
    for condition in win_conditions:
        if board[condition[0]] + board[condition[1]] + board[condition[2]] in ['xxx','ooo']:
            return board[condition[0]]
    return False

def player_input(board):
    player_move = input('Type the positin for "o" or 9 to exit: ')
    if player_move in [str(x) for x in range(9)]:
        board[int(player_move)] = player
    elif player_move == '9':
        return
    elif player_move == 'restart':
        board = ['_' for x in range(9)]
    else:
        print('Please give a valid input.')
    print_board(board)
    winner = check_win(board)
    if winner != False:
        print(f'The winner is {winner}')
        return
    if check_empty(board) == True:
        player_input(board)

player_input(board)