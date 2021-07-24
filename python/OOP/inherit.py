class SchoolMember:
    '''Для любого участника школы'''
    def __init__(self,name,age):
        self.name = name
        self.age = age
        print('(Создан экземпляр SchoolMember: {0})'.format(self.name))

    def tell(self):
        '''Вывести информацию'''
        print('Имя: "{0}" Возраст: "{1}"'.format(self.name, self.age), end=" ")

class Teacher(SchoolMember):
    '''Представляет преподователя'''
    def __init__(self,name,age,salary):
        SchoolMember.__init__(self,name,age)
        self.salary = salary
        print('(Создан экземпляр Teatcher: {0})'.format(self.name))
        
    def tell(self):
        SchoolMember.tell(self)
        print('Зарплата: "{0:d}"'.format(self.salary))

class Student(SchoolMember):
    '''Представляет студента'''
    def __init__(self,name,age,marks):
        SchoolMember.__init__(self,name,age)
        self.marks = marks
        print('(Создан экземпляр Student: {0})'.format(self.name))

    def tell(self):
        SchoolMember.tell(self)
        print('Оценки: "{0:d}"'.format(self.marks))

teacher1 = Teacher('Mrs. Shrividya', 40, 30000)
student1 = Student('Swaroop', 25, 75)

print()

members = [teacher1, student1]

for member in members:
    member.tell()