class Tic_Tac_Toe:
    x = 2
    
    
    def __init__(self):
        self.board = self.make_board()
        self.placeholder = self.show_position(self.board)
        
    def make_board(self):
        return [' ' for _ in range(9)]
        
    def show_position(self, f):
        return [x for x in f]

f = Tic_Tac_Toe()


print(f.show_position)
print(f.board)
