import pickle

#имя файла для хранения объекта
shoplistfile = 'shoplist.data'
filefolder = 'files/'
#список покупок
shoplist = ['apple','mango','carrot']

#запись в файл
f = open(filefolder + shoplistfile, 'wb')
pickle.dump(shoplist,f)
f.close()

#уничтожаем переменную shoplist
del shoplist

#считываем из хранилища
f = open(filefolder + shoplistfile, 'rb')
storedlist = pickle.load(f)
print(storedlist)