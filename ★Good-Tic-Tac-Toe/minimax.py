class Tic_Tac_Toe:
    x = 2
    board = [' ' for _ in range(9)]
    
    
    def __init__(self):
        # self.board = self.make_board()
        # self.updade_board = self.print_board(self.board)
        pass
        
    def print_board(self, board):
        print(f'{0} {1} {2}\n{3} {4} {5}\n{6} {7} {8}\n')
        print(f'{board[0]} {board[1]} {board[2]}\n{board[3]} {board[4]} {board[5]}\n{board[6]} {board[7]} {board[8]}\n')

    print_boar = print_board(board)
    # f'{} {} {}\n{} {} {}\n{} {} {}\n'

game = Tic_Tac_Toe()

game.board[3] = 3
print(game.board)
print(game.print_board())