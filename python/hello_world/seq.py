shoplist = ['apple','mango','carrot','banana']
name = 'swaroop'
#index
print('Элемент 0 -', shoplist[0])
print('Элемент 0 -', shoplist[1])
print('Элемент 0 -', shoplist[2])
print('Элемент 0 -', shoplist[3])
print('Элемент 0 -', shoplist[-1])
print('Элемент 0 -', shoplist[-2])
print('Символ 0 -', name[0])
#обработка элемементов
print('Элементы с 1 по 3:', shoplist[1:3])
print('Элементы с 2 по последнего:', shoplist[2:])
print('Элементы с 1 по -1:', shoplist[1:-1])
print('Все элементы:', shoplist[:])
#работа со строкой
print('Символы с 1 по 3:', name[1:3])
print('Символы с 2 до конца:', name[2:])
print('Символы с 1 по -1:', name[1:-1])
print('Символы от начала до конца:', name[:], '\n')

bri = set(['Бразилия', 'Индия', 'Россия'])
print('Индия' in bri)
print('USA' in bri)

bric = bri.copy()
bric.add('China')
print(bric.issuperset(bri))

bri.remove('Россия')
print(bri & bric)
