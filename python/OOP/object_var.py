class Robot:
    '''Представляет робота с именем'''
    #Счетчик экземпляров класса Robot
    population = 0

    def __init__(self,name):
        '''Входные данные для нинициализации'''
        self.name = name
        print('(Инициализация {0})'.format(self.name))

        #При создании экземпляра пополняем счетчик
        Robot.population +=1

    def __del__(self):
        '''Уничтожаем экземпляр'''
        print('{0} уничтожен!'.format(self.name))

        Robot.population -= 1

        if Robot.population == 0:
            print('{0} был последним экземпларом'.format(self.name))
        else:
            print('Осталось {0:d} работающих экземпляров'.format(Robot.population))

    def sayHi(self):
        '''Функция приветствия'''
        print('Приветствую! Мое имя {0}'.format(self.name))

    def howMany():
        '''Вывод количества экземпляров'''
        print('Количество реализованных экземпляров - {0:d}'.format(Robot.population))

    def classInfo():
        print('\nОписание методов класса:')
        print('класс Robot:',Robot.__doc__)
        print('метод __init__:',Robot.__init__.__doc__)
        print('метод __del__:',Robot.__del__.__doc__)
        print('метод sayHi:',Robot.sayHi.__doc__)
        print('метод howMany:',Robot.howMany.__doc__)

    howMany = staticmethod(howMany)

droid1 = Robot('R2-D2')
droid1.sayHi()
Robot.howMany()

droid2 = Robot('C-3PO')
droid2.sayHi()
Robot.howMany()

print('\n Экземпляры выполняют поставленную задачу')

print('Задача выполнена, экземпляры уничтожаются.\n')
del droid1
del droid2

Robot.howMany()

Robot.classInfo()