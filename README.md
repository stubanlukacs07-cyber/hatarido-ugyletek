# Határidős ügyletek

Deviza határidős ügyletek, lekötések, élő árfolyamok és titkosított jelszótár, telefonra telepíthető webappként.

**Az adatok nincsenek ebben a repóban.** Minden ügylet, lekötés és jelszó csak azon az eszközön tárolódik, ahol az appot használod. Adatmentés (`.json`) soha ne kerüljön ide – a `.gitignore` ezt megakadályozza.

## Élő árfolyamok
- Élő középárfolyam: Coinbase nyilvános API, percenként frissül, amíg az app nyitva van.
- Napi változás és grafikonok: Európai Központi Bank referencia-árfolyam (Frankfurter API).
- Mindkettő ingyenes, nem kell hozzá kulcs.

## Frissítés
Cseréld le az `index.html`-t, majd:
```
git add . && git commit -m "Frissítés" && git push
```

## Szinkron telefon és gép között
1. Hozz létre egy **privát** repót (pl. `hatarido-adatok`), „Add a README file” bepipálva.
2. GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token.
   Repository access: *Only select repositories* → `hatarido-adatok`. Permissions → **Contents: Read and write**.
3. Az appban: Adatok és mentés → Szinkron. Add meg a repót, a tokent és egy szinkron jelszót.
   Először azon az eszközön, ahol az adatok vannak, utána a többin **ugyanazzal a jelszóval**.

Az adatok titkosítva (AES-256) kerülnek a repóba, a szinkron jelszó sehol nincs eltárolva.
