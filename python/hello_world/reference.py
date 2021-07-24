print('Простое присваиванивание')
shoplist = ['apple','mango','carrot','banana']
mylist = shoplist

del shoplist[0]
print('shoplist: ', shoplist)
print('mylist: ', mylist)

print('Копированние при помощи полной вырезки')
mylist = shoplist[:]
del mylist[0]
print('shoplist: ', shoplist)
print('mylist: ', mylist)