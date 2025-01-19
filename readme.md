Nowy update, zrobiony panel admina z opcja dodawania nowych artykulow. Jak chodzi o frontend to tylko w sumie
zmienilem kolor na czarny zeby nie razil mnie w oczy wiec to juz zostawiam dla was. Oliwier potem ogarnie zabezpieczenia
api bo już rozmawiałem z nim o tym wiec tym sie nie trzeba przejmowac. Jak bedziecie potrzebowac cos zmienic czy cos to zmieniajcie,
tylko zeby potem dzialalo. najlepiej tylko nie zmieniajcie pliku node'a (index.js) ale jak bedzie trzeba to tez to zmiencie i tyle.

Jesli chodzi o mongodb, to baza to koniec-kwarantanny i dwie kolekcje sa jako pliki JSON do importu


# Instalacja
Rozpakujcie lub sklonujcie projekt z githuba, wszystkie zaleznosci z node sa juz zainstalowane, wystrczy sam node.
zrobcie plik **.env** i zrobcie dwie zmienne, cos takiego:
<br>`MONGODB_URI="mongodb://localhost:27017/koniec-kwarantanny"` - przykladowy URL do mongodb
<br>`SESSION_SECRET="jakissekretsewpiszcie"` - sekret do cookies

potem tylko zeby odpalic to ``node .``



Zycze powodzenia w pracy, Mateusz S
