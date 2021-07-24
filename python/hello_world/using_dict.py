adressBook = {
    'Jonny' : 'jonny@mail.ru',
    'Adam' : 'adam@mail.ru',
    'Jessy' : 'jessy@mail.ru',
    'Lisa' : 'lisa@mail.ru',
    'Spammer' : 'spammer@mail.ru'
}

print('Adam\'s e-mail: ', adressBook['Adam'])

del adressBook['Spammer']

print('In the adrees book {0} contacts\n'.format(len(adressBook)))

for name, adress in adressBook.items():
    print('Contact {0} with adress {1}'.format(name,adress))

adressBook['Guido'] = 'guido@python.org'

if 'Guido' in adressBook:
    print('Guido adress:', adressBook['Guido'])