zoo = ('python','elephant','penguin')
print('number of animals in the zoo: ', len(zoo))

new_zoo = 'monkey','camel',zoo
print('Number of cells in the zoo:', len(new_zoo))
print('All animals in new zoo', new_zoo)
print('Animals brought from the old zoo:', new_zoo[2])
print('Last animal, brought from the old zoo', new_zoo[2][2])
print('Number of animals in the new zoo:', len(new_zoo) - 1 + len(new_zoo[2]))
