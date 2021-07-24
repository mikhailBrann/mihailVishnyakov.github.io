#подключем библиотеку для работы с файлами
from init import *

addressBookPath = 'address_book.data'

#инициализируем книгу
checkFile(addressBookPath)

#инициализируем активность в программе
userState = True


#работа с пользователем
def userInpitCheak(inputText):
    inputText.lower().lstrip()
    if(inputText == 'справка'):
        helper = 'Основные команды:\n \
        1) "добавить контакт" - добавляет контакт в адресную книгу.\n \
        2) "удалить контакт" - удаляет контакт из адресной книги.\n \
        3) "изменить контакт" - изменяет контакт.\n \
        4) "найти контакт" - находит контакт в адресной книге.\n \
        5) "показать контакты" - выводит все контакты из адресной книги на экран.\n \
        5) "выход"'
        print(helper)

    elif(inputText.lower() == 'добавить контакт' or inputText.lower() == 'add user'):
        addBookContact(addressBookPath)  
    elif(inputText.lower() == 'удалить контакт' or inputText.lower() == 'remove user'):
        removeContact(addressBookPath)
    elif(inputText.lower() == 'изменить контакт' or inputText.lower() == 'change user'):
       changeContact(addressBookPath)            
    elif(inputText.lower() == 'найти контакт' or inputText.lower() == 'find user'):
        searchContact(addressBookPath)
    elif(inputText.lower() == 'show file'):
        showFile(addressBookPath)
    elif(inputText.lower() == 'показать контакты' or inputText.lower() == 'show list'):
        showContactsList(addressBookPath)
    elif(inputText.lower() == 'выход' or inputText.lower() == 'q'):
        print('До свидания')
        global userState
        userState = False
    else:
        print(inputText + ' - неверная команда\n')

while True:
    if(userState == False):
        break
     
    print('для получения справки введите - "справка"')
    userInputText = input('Пожалуйста введите комманду --->')
    userInpitCheak(userInputText)

