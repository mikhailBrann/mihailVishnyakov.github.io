poem = '''\
Прогрпммировать весело.
Если работа скучна,
Чтобы придать ей весёлый тон -
    используй Python!
'''
#для русского языка кодировку перекинул на utf-8
poem_file = open('files/poem.txt', 'w', encoding='utf-8')
poem_file.write(poem)
poem_file.close()

#читаем поэму
read_poem = open('files/poem.txt',encoding='utf-8')
while True:
    line = read_poem.readline()
    if len(line) == 0:
        break
    print(line, end='')

read_poem.close()