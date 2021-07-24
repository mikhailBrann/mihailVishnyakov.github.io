#подгружаем библиотеки
import os
import time



#пути для бэкапа
sourse = ['"E:{0}tatoo"'.format(os.sep), '"E:{0}полезности"'.format(os.sep)]
#путь для хранения бекапов
backup_folder = 'E:{0}lern_projects{0}python{0}backup_files{0}bakup_castom_folder'.format(os.sep)

#генерим имя для подкаталога
today = backup_folder + os.sep + time.strftime('%Y%m%d')
now = time.strftime('%H%M%S')

#создаем подкатолог для хранения бекапа
if not os.path.exists(today):
    os.mkdir(today)
print('Backup directory sucefull!')

#создаем zip файл
target = today + os.sep + now + '.zip'

zip_command = "zip -qr {0} {1}".format(target, ' '.join(sourse))

if os.system(zip_command) == 0:
    print('backup files complite in folder:', backup_folder)
else:
    print('backup files error!!!')