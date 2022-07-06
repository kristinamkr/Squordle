pokelist = open("./pokemonlist.txt", "r", encoding='UTF-8')
plist = pokelist.read().split("\n")

for p in range(len(plist)):
	if plist[p][0] in {'1','2','3','4','5','6','7','8','9','0'}:
		plist[p] = plist[p][4:]

pokelist5_8 = []

plen = dict()
for p in plist:
	length = len(p)

	if 9 > length > 4:
		pokelist5_8.append(p)

	if length not in set(plen.keys()):
		plen[length] = 0

	plen[length] += 1

print(plen)
print(pokelist5_8)

pokelist.close()