name = 'Swaroop'

if name.startswith('Swa'):
    print('Да, строка начивается на "Swa"')

if 'a' in name:
    print('Да она содержит символ "a"')

if name.find('war') != -1:
    print('Да она содержит строчку "war"')

delimetr = '~\_(^|^)_/~'

mylist = ['Brazil','Russia','India','China']

print(delimetr.join(mylist))