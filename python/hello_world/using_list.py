shoplist = ['apple', 'mango', 'carrot', 'banana']

print('I have to ', len(shoplist), 'shop.')

print('list:', end = '')
for item in shoplist:
    print(item, end = ' ')

print('\nYou also need to buy rice')
shoplist.append('rice')
print('Now my shoping list is this:', shoplist)

print('I sort my shoping list')
shoplist.sort()
print('Sorted shoping list looks like this:', shoplist)

print('The first thing i need to buy is: ', shoplist[0])
olditem = shoplist[0]
del shoplist[0]
print('I buy', olditem)
print('Now my shoping list like this:', shoplist)
