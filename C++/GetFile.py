from random import randrange

def make_file(n):
    f = open(f'{n}.txt', 'w')
    f.write(str(n) + '\n')
    x1 = 0
    y1 = 0
    x2 = n
    y2 = n
    for i in range(n):
        f.write(str(x1) + ' ' + str(y1) + ' ' + str(x2) + ' ' + str(y2) + '\n')
        x1 += 1 
        y1 += 2
        x2 += 1
        y2 += 2
        
    f.close()

n = int(input())
make_file(n)
