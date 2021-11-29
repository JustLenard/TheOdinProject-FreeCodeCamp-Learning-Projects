board = ['_' for x in range(9)]
win_conditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
hu_player = 'o'
ai = 'x'

print(f'{0} {1} {2}\n{3} {4} {5}\n{6} {7} {8}\n')

def print_board(board):
    # print(f'{0} {1} {2}\n{3} {4} {5}\n{6} {7} {8}\n')
    print(f'\n{board[0]} {board[1]} {board[2]}\n{board[3]} {board[4]} {board[5]}\n{board[6]} {board[7]} {board[8]}\n--')

def get_legal_moves(board):
    valid_positions = []
    for x in range(9):
        if board[x] == '_':
            valid_positions.append(x)
    # print(valid_positions)
    return valid_positions

def check_win(board, ):
    for condition in win_conditions:
        if board[condition[0]] + board[condition[1]] + board[condition[2]] == ai * 3:
            return 10
        elif board[condition[0]] + board[condition[1]] + board[condition[2]] == hu_player * 3:   
            return -10
    return 0

board = ['x','o','x','o','_','x','o','_','_']
print_board(board)
print('------------------')

def get_opponent(current_player):
    if current_player == ai:
        return hu_player
    elif current_player == hu_player:
        return ai


def make_move(board, current_player, position):
    # print(position)
    board[position] = current_player
    return board


def minimax_ai(board, current_player):
    best_move = best_score = None
    
    legal_moves = get_legal_moves(board)

    for legal_move in legal_moves:
        
        new_board = make_move(board, current_player, legal_move)
        
        score = minimax(new_board, ai)
        
        board[legal_move] = '_'
        
        if best_score is None or score > best_score:
            best_score = score
            best_move = legal_move
    print(f'Best move is: {best_move} with the score of: {best_score}')




def minimax(board, current_player):
    legal_moves = get_legal_moves(board)

    if len(legal_moves) == 0:
        return check_win(board)

    scores = []
    
    for legal_move in legal_moves:
        # print(legal_move)
        new_board = make_move(board, current_player, legal_move)
        print_board(new_board)
        # print(f'The value of the current move is {check_win(board)}')
        # print(new_board)
        opponet = get_opponent(current_player)
        print(f'This is opponent: {opponet}')         
        # print(opponet)
        score = minimax(new_board, opponet)
        # new_board
        # print(score)
        scores.append(score)
        board[legal_move] = '_'
    print(f'Scores at the end: {scores}')
    if current_player == ai:
        return max(scores)
    else:
        return min(scores)
            
            
minimax_ai(board, ai)
