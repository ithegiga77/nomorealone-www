# Koniec Kwarantanny

## Instalacja
```bash
npm i
```

Zmień plik `.env.example` na `.env` i ustaw `SESSION_SECRET` *(np. na losowy string 64 bajtowy)* 

## Development
Podczas Developmentu potrzebujesz zainstalowanego lokalnie [MongoDB](https://www.mongodb.com/try/download/community).

Włącz serwer wpisując 
```bash 
npm run dev
```

Przy piewszym uruchomieniu pojawi ci się baza danych `koniec-kwarantanny` i wrzuć tymczasowe dane do `admins` i `articles`
