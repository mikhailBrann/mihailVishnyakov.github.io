#удаляет знаки из предложения
def del_symbols(text):
    symbols = '.?!:;-—()[]’“”/,'
    
    for symbol in symbols:
        text = text.replace(symbol,'')
    return text

#переварачивает строку задом на перед
def revers(text):
    return text[::-1]

def is_palindrome(text):
    return text == revers(text)

user_text = input('Введите текст для проверки на палинром -->')
del_symbols(user_text)

if is_palindrome(user_text):
    print('Да, это палиндром')
else:
    print('Нет, это не палиндром')
