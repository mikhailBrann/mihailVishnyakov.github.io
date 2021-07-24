import eel, pickle, os, re

addressBookPath = 'address_book.data'

def showFile(rootPath):
    '''функция принтует файл'''

    fId = open(rootPath, 'rb')
    enterData = pickle.load(fId)
    fId.close()
    return enterData

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

@eel.expose
def addBookContact(userName, userFatherName, userSurname, userPhone, userEmail):
    '''функция добавления контакта'''

    userId = getAddrBook(addressBookPath)
    userName = userName.lstrip()
    userFatherName = userFatherName.lstrip()
    userSurname = userSurname.lstrip()
    userPhone = userPhone.lstrip()
    userEmail = userEmail.lstrip()

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
    f = open(addressBookPath, 'wb')
    pickle.dump(userId,f)
    f.close()

    return 'Пользователь ' + user['name'] + ' ' + user['fathername'] + ' ' + user['surname'] + ' успешно добавлен в базу!'
    del userId

@eel.expose
def removeContact(delUserId):
    '''функция удаления контакта''' 
    contactListDel = getAddrBook(addressBookPath)
    delState = False
    delUserName = ''

    for item in contactListDel['result']:
        if(item['id'] == int(delUserId) and int(delUserId) > 0):
            delUserName =  item['name'] + ' ' + item['fathername'] + ' ' + item['surname']

            contactListDel['result'].remove(item)
            f = open(addressBookPath, 'wb')
            pickle.dump(contactListDel,f)
            f.close()
            
            del contactListDel
            delState = True
            
    if(delState == True):
        return 'Пользователь ' + delUserName + ' успешно удален!'
    else:
        return delUserId + ' - неверно, введите id из списка контактов'


@eel.expose
def searchContact(userInput):
    '''функция поиска контакта'''
    findState = False
    findResultArr = []
    #для работы с пользовательским вводом
    def firstWordInString(inputString):
        regExRule = r"[0-9a-zA-Zа-яА-Я][\w']*"
        result = re.search(regExRule,inputString)
        return result.group(0)

    #получаем пользовательский ввод и отсекам его по первому введенному значению
    resultString = firstWordInString(userInput.lstrip()).lower()
    contactList = getAddrBook(addressBookPath)
     
    for findUser in contactList['result']:       
        if(str(findUser['id']) == resultString or findUser['name'].lower() == resultString or findUser['surname'] == resultString):
            findResultArr.append(findUser)
        
    if not findResultArr:
        return 'empty'
    else:
        return findResultArr

@eel.expose
def changeContact(userId, userInput):
    '''функция изменения контакта'''

    contactList = getAddrBook(addressBookPath)
    changeStatus = False
    answer = 'Извините, пользователь с таким id не найден в базе, воспользуйтесь поиском'

    for user in contactList['result']:
        if(str(userId) == str(user['id'])):
            
            for userKey in user:
                if userKey in userInput:
                    if userKey != 'email' and userKey != 'phone':
                        user[userKey] = userInput[userKey].capitalize()
                    else:
                        user[userKey] = userInput[userKey]

                    changeStatus = True
                    answer = user
                    
    if(changeStatus == True):
        #если были изменения, записываем их в файл
        f = open(addressBookPath, 'wb')
        pickle.dump(contactList,f)
        f.close()
        del contactList
        return answer
    else:
        return answer

@eel.expose
def getContactById(userId):
    '''возвращает объект пользоваетля по id'''
    contactList = getAddrBook(addressBookPath)

    for user in contactList['result']:
        if(str(userId) == str(user['id'])):
            return user

@eel.expose
def showContactsList():
    '''функция выводит список контактов'''

    contactList = getAddrBook(addressBookPath)
    contactList['result'].sort(key = lambda i : i['id'])

    return contactList['result']