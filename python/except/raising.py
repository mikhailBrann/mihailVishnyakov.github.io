class ShortInputException(Exception):
    '''User exception class'''
    def __init__(self, length, atleast):
        Exception.__init__(self)
        self.length = length
        self.atleast = atleast

try:
    text = input('Please, input text -->')
    if len(text) < 3:
        raise ShortInputException(len(text), 3)
except EOFError:
    print('you call error EOF')
except ShortInputException as ex:
    print('ShortInputException: длина введенной строки -- {0}; \
        ожидалось, как минимум, {1}'.format(ex.length, ex.atleast))
else:
    print('не было исключений')