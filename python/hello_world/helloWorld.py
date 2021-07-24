def findMax(a, b):
    if a > b:
        print(a, 'максимально')
    elif a == b:
        print(a, 'и', b, 'равны')
    elif a < b:
        print(b, 'максимально')
        

a = 7
b = 16

findMax(a, b)