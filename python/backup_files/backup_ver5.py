#подгружаем библиотеки
import os, time, zipfile

#пути для бэкапа
sourse = ["E:{0}tatoo{0}".format(os.sep), "E:{0}полезности{0}".format(os.sep)]
#путь для хранения бекапов
backup_folder = 'E:{0}lern_projects{0}python{0}backup_files{0}bakup_castom_folder'.format(os.sep)

#генерим имя для подкаталога
today = backup_folder + os.sep + time.strftime('%Y%m%d')
now = time.strftime('%H%M%S')

#добавляем функционал комментирования архива для пользователя и генерим название для файла
comment = input('Введите комментарий -->')
if len(comment) == 0:
    target = today + os.sep + now + '.zip'
else:
    target = today + os.sep + now + \
        comment.replace(' ', '_') + '.zip'


#создаем подкатолог для хранения бекапа с указанием даты
if not os.path.exists(today):
    os.mkdir(today)
print('Backup directory sucefull!')


#создаем объект архива 
resultZipArch = zipfile.ZipFile(target, 'w')

#наполняем ахив файлами
for url in sourse:
    for distr,folder,files in os.walk(url):
        for file in files:
            resultZipArch.write(os.path.join(distr,file))

resultZipArch.close()