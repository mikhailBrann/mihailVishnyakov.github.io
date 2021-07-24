#импортируем системные библиотеки
import pickle, os, re


def showFile(rootPath):
    '''функция принтует файл'''

    fId = open(rootPath, 'rb')
    enterData = pickle.load(fId)
    fId.close()
    print(enterData)

def checkFile(filePath):
    '''функция проверяет, есть ли файл библиотеки(если нет, то создает)'''

    try:
        f = open(filePath)
        f.close()
        return True
    except FileNotFoundError:
        userAdmin = {
            'id' : 0,
            'name' : 'Админ',
            'fathername' : 'Админович',
            'surname' : 'Админов',
            'phone' : '+7(999)999-99-99',
            'email' : 'admin@mail.ru'
        }

        userList = {
            'result' : [userAdmin],
            'lastId' : 0
        }
      
        f = open(filePath, "wb")
        pickle.dump(userList,f)
        f.close()
        del userAdmin
        return False

def getAddrBook(rootPath):
    '''функция возвращает список из последний наибольший id'''

    fId = open(rootPath, 'rb')
    enterData = pickle.load(fId)
    result = enterData.copy()
    result['lastId'] = result['result'][-1]['id']
    fId.close()
    return result


def addBookContact(rootPath):
    '''функция добавления контакта'''

    userId = getAddrBook(rootPath)
    userName = input('Введите имя --->').lstrip()
    userFatherName = input('Введите отчество --->').lstrip()
    userSurname = input('Введите фамилию --->').lstrip()
    userPhone = input('Введите телефон --->').lstrip()
    userEmail = input('Введите email --->').lstrip()

    user = {
        'id' : userId['lastId'] + 1,
        'name' : userName,
        'fathername' : userFatherName,
        'surname' : userSurname,
        'phone' : userPhone,
        'email' : userEmail
    }


    #я так понял что pickle не может работать с переменной в файле, поэтому будем перезаписывать
    userId['result'].append(user)
    userId['lastId'] = userId['result'][-1]['id'] 
    #запись в файл
    f = open(rootPath, 'wb')
    pickle.dump(userId,f)
    f.close()

    print('Пользователь ' + user['name'] + ' ' + user['fathername'] + ' ' + user['surname'] + ' успешно добавлен в базу!\n')
    del userId


def removeContact(rootPath):
    '''функция удаления контакта'''

    delUserId = input('Укажите id пользователя для удаления из адресной книги --->').lstrip()
    areYouSure = input('Вы уверенны (Y/N) --->').lstrip()
    if(areYouSure == 'Y'):
        contactListDel = getAddrBook(rootPath)
        delState = False

        for item in contactListDel['result']:
            if(item['id'] == int(delUserId) and int(delUserId) > 0):
                contactListDel['result'].remove(item)
                f = open(rootPath, 'wb')
                pickle.dump(contactListDel,f)
                f.close()
                
                del contactListDel
                delState = True
                
        if(delState == True):
            print('Пользователь успешно удален!\n')
        else:
            print(delUserId + ' - неверно, введите id из списка контактов\n')



def searchContact(rootPath):
    '''функция поиска контакта'''
    findState = False
    #для работы с пользовательским вводом
    def firstWordInString(inputString):
        regExRule = r"[0-9a-zA-Zа-яА-Я][\w']*"
        result = re.search(regExRule,inputString)
        return result.group(0)

    #получаем пользовательский ввод и отсекам его по первому введенному значению
    userInput = input('Укажите id пользователя или фамилию или имя--->').lstrip()
    resultString = firstWordInString(userInput).lower()

    contactList = getAddrBook(rootPath)
    tableHeader = '\n/*-------результаты поиска-------*\\\n'
    print(tableHeader)
    
    for findUser in contactList['result']:
        
        if(str(findUser['id']) == resultString or findUser['name'].lower() == resultString or findUser['surname'] == resultString):
            print('id: {0}, {1} {2} {3}\n\nТелефон: {4}, Email: {5}'.format(findUser['id'],findUser['name'],findUser['fathername'],findUser['surname'],findUser['phone'],findUser['email']))
            print('-------------------------------------------------------------------')

            findState = True
        
    if(findState == False):
        print('Извините, по Вашему запрому ничего не найдено') 

    print('\n')


def changeContact(rootPath):
    '''функция изменения контакта'''

    contactList = getAddrBook(rootPath)
    userId = input('Укажите id пользователя--->').lstrip()
    changeStatus = False

    for user in contactList['result']:
        if(userId == str(user['id'])):
            changeFild = input('Выберите поле для изменения (Имя, Отчество, Фамилия, Телефон, E-mail)--->').lstrip()
            if(changeFild.lower() == 'имя'):
                changeFildValue = input('Укажите новое имя--->').lstrip()
                user['name'] = changeFildValue.capitalize()
                changeStatus = True

            if(changeFild.lower() == 'отчество'):
                changeFildValue = input('Укажите новое отчество--->').lstrip()
                user['fathername'] = changeFildValue.capitalize()
                changeStatus = True
    
            if(changeFild.lower() == 'фамилия'):
                changeFildValue = input('Укажите новую фамилию--->').lstrip()
                user['surname'] = changeFildValue.capitalize()
                changeStatus = True

            if(changeFild.lower() == 'телефон'):
                changeFildValue = input('Укажите новый телефон--->').lstrip()
                user['phone'] = changeFildValue.lower()
                changeStatus = True

            if(changeFild.lower() == 'e-mail' or changeFild.lower() == 'email'):
                changeFildValue = input('Укажите новый e-mail--->').lstrip()
                user['email'] = changeFildValue.lower()
                changeStatus = True


    if(changeStatus == True):
        #если были изменения, записываем их в файл
        f = open(rootPath, 'wb')
        pickle.dump(contactList,f)
        f.close()
        del contactList
        print('Изменения успешно сохранены\n')
    else:
        answer = 'Извините, пользователь с id "' + userId + '" не найден в базе, воспользуйтесь поиском\n'
        print(answer)


def showContactsList(rootPath):
    '''функция выводит список контактов'''

    contactList = getAddrBook(rootPath)
    contactList['result'].sort(key = lambda i : i['id'])
    
    tableHeader = '\n/*-------контакты-------*\\\n'
    print(tableHeader)
    for key in contactList['result']:
        print('id: {0}, {1} {2} {3}\n\nТелефон: {4}, Email: {5}'.format(key['id'],key['name'],key['fathername'],key['surname'],key['phone'],key['email']))
        print('-------------------------------------------------------------------')
    print('\n')