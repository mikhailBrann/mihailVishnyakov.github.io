#подгружаем библиотеки
import os
import time



#пути для бэкапа
sourse = ['"E:\\tatoo"', '"E:\\полезности"']
#путь для хранения бекапов
backup_folder = 'E:\\lern_projects\\python\\backup_files\\bakup_castom_folder'

#имя для бекапа
backup_name = backup_folder + os.sep + time.strftime('%Y%m%d%H%M%S') + '.zip'
print(backup_name)

zip_command = "zip -qr {0} {1}".format(backup_name, ' '.join(sourse))

if os.system(zip_command) == 0:
    print('backup files complite in folder:', backup_folder)
else:
    print('backup files error!!!')