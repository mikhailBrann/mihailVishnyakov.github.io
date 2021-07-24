class Person:
    def __init__(self,name):
        self.name = name
    def sayHi(self):
        print('My name is', self.name)

personV = Person('Valera')
personV.sayHi()