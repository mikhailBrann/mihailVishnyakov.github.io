def get_error_details(a, *b):
    a,b = b,a
    return (a, b)

errnum, errstring = get_error_details(2, 'много', 'немытых', 'негритянский', 'хуев')

print(errnum)
print(errstring)

flag = True
if flag: print('Yes')