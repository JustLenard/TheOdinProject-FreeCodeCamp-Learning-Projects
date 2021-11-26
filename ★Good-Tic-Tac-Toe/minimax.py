board = ['_' for x in range(9)]
win_conditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
hu_player = 'x'
ai = 'o'


print(f'{0} {1} {2}\n{3} {4} {5}\n{6} {7} {8}\n')


def print_board(board):
    # print(f'{0} {1} {2}\n{3} {4} {5}\n{6} {7} {8}\n')
    print(f'{board[0]} {board[1]} {board[2]}\n{board[3]} {board[4]} {board[5]}\n{board[6]} {board[7]} {board[8]}\n')


def check_empty(board):
    for postion in board:
        if postion == '_':
            return True
    return False

def check_win(board):
    for condition in win_conditions:
        if board[condition[0]] + board[condition[1]] + board[condition[2]] == ai * 3:
            return 10
        elif board[condition[0]] + board[condition[1]] + board[condition[2]] == hu_player * 3:   
            return -10
         
    return 0


board = ['x','o','x','o','_','x','o','_','_']

print_board(board)
print('------------------------------')

def valid_positions(board):
    valid_positions = []
    for x in range(9):
        if board[x] == '_':
            valid_positions.append(x)
    # print(valid_positions)
    return valid_positions

def minimax(board, deph, is_maximaxing):
    score = check_win(board)
    print(score)

    if score == 10:
        return score
    if (score == -10):
        return score
    
    if check_empty == False:
        return 0
    
    if is_maximaxing:
        best_score = -1000
        
        for x in range(9):
            if board[x] == '_':
                board[x] = hu_player
                best_score = max(best_score, minimax(board, deph + 1, not is_maximaxing))
                board[x] = '_'
                print(best_score)
        return best_score
    else:
        best_score = 1000
        for x in range(9):
            if board[x] == '_':
                board[x] = ai
                best_score = min(best_score, minimax(board, deph + 1, not is_maximaxing))
                board[x] = '_'
        return best_score
    
def find_best_move(board):
    best_move = -1
    best_value = -1000
    
    avail_position = valid_positions(board)
    # print(avail_position)
    for position in avail_position:
        board[position] = hu_player
        move_value = minimax(board, 0 , False)
        print_board(board)

        board[position] = '_'
        print(move_value)
        
        if move_value > best_value:
            best_value = move_value
            best_move = position
    return best_move

best_move1 = find_best_move(board)

print(best_move1)
# def ai_turn(board):
#     # return the valid position
#     valid_positions = []
#     for x in range(9):
#         if board[x] == '_':
#             valid_positions.append(x)
#     print(valid_positions)
#     minimax(board, valid_positions, True)

# def minimax(internal_board, valid_positions, ismaximazing):
#     max_score = -10
#     min_score = -19
#     draw = 0
    
#     if ismaximazing:
#         for position in valid_positions:
#             board[position] = ai
#             print_board(board)
#             if ai == check_win(board):
#                 print('return 1')
#             elif ai != check_win(board):
#                 print('return -1')
#             board[position] = '_'
#             # check for dra somewhein here

# def minimax(new_board, player, is_maximazing):
#     print(f"It's the turn of: {player}")

#     scores = []
#     best_score = -100
#     avail_positions = valid_positions(new_board)
#     if is_maximazing:
#         print(f'Board at start  of {player} turn {new_board}')
#         print(avail_positions)
#         for position in avail_positions:
#             new_board[position] = player
#             print_board(new_board)
#             check = check_win(new_board, player)
#             if check_win(new_board,player) == player:
#                 print('10 \n')
#                 scores.append(10)
#             elif  check_win(new_board,player) == False:
#                 print('0\n')
#                 scores.append(0)
#             else:
#                 print('-10\n')
#                 scores.append(-10)
#             new_board[position] = '_'
#         best_score = max(scores)
#         new_board[avail_positions[scores.index(best_score)]] = player
#         # print(f'Board after after {player} move: {new_board}')
#         # print(f'Best score is for max: {best_score}\n')
#         if check_win(new_board, player) == player:
#             print_board(new_board)
#             print(f'The winner is: {player}')
#             return 
#         if check_empty(new_board):
#             minimax(new_board, hu_player, False)
        
#     elif not is_maximazing:
#         print(f'Board at start  of {player} turn {new_board}')
#         for position in avail_positions:
#             new_board[position] = player
#             print_board(new_board)
#             check = check_win(new_board, player)
#             if check_win(new_board,player) == player:
#                 print('-10 \n')
#                 scores.append(-10)
#             elif check_win(new_board,player) == False:
#                 print('0\n')
#                 scores.append(0)
#             else:
#                 print('10\n')
#                 scores.append(10)
#             new_board[position] = '_'

#         best_score = min(scores)
#         new_board[avail_positions[scores.index(best_score)]] = player
#         print(f'Board after after {player} move: {new_board}')

#         print(f'Best score is for min: {best_score}\n')
#         if check_win(new_board, player) == player:
#             print_board(new_board)
#             print(f'The winner is: {player}')
#             return 
#         if check_empty:
#             minimax(new_board, ai, True)


# val = minimax(board,hu_player)
# minimax(board, ai, True)
# print(val)
    # for position in valid_positions:
    #     print('in the for loop')
    #     board[position] = ai
    #     print(board[position])
    #     print_board(board)
    #     if check_win(board) != False:
    #         return f'winner found {position}'

        

# def player_input(board):
#     player_move = input('Type the positin for "o" or 9 to exit: ')
#     if player_move in [str(x) for x in range(9)]:
#         board[int(player_move)] = player
#     elif player_move == '9':
#         return
#     elif player_move == 'restart':
#         board = ['_' for x in range(9)]
#     else:
#         print('Please give a valid input.')
#     print_board(board)
#     winner = check_win(board)
#     if winner != False:
#         print(f'The winner is {winner}')
#         return
#     if check_empty(board) == True:
#         player_input(board)

# player_input(board)
