from init import *

#инициализируем книгу
checkFile('address_book.data')


#инициализация web-интерфейса
eel.init('web')
eel.start('main.html',size=(1500,900))