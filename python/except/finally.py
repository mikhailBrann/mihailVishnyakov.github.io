import time

try:
    f = open('E:\\lern_projects\\python\\input_output\\files\\poem.txt',encoding='utf-8')
    while True:
        line = f.readline()
        if len(line) == 0:
            break
        print(line, end='')
        time.sleep(2)#небольшой таймаут
except KeyboardInterrupt:
    print('Вы отменили чтение файла!!')
finally:
    f.close()
    print('(Очистка: закрытие файла)')
