# SERVER_SETUP — Instrukcja przygotowania serwera Ubuntu (PL)

Poniżej znajdują się gotowe polecenia i wskazówki, które należy wykonać na serwerze Ubuntu, aby przygotować środowisko do serwowania statycznej strony wygenerowanej przez Astro.

UWAGA: Nie wykonuję tych poleceń zdalnie. Musisz zalogować się na serwer samodzielnie, np.:

```bash
ssh atelier@65.21.179.14
```

1) Pobierz skrypt i uruchom go (szybkie):

```bash
# z lokalnej maszyny
scp scripts/setup-server.sh atelier@65.21.179.14:/tmp/

# na serwerze
ssh atelier@65.21.179.14 'bash /tmp/setup-server.sh'
```

2) Co robi skrypt:
- `apt update` i `apt upgrade`
- instaluje `curl`, `git`, `nginx`
- instaluje Node.js (Node 20 LTS) poprzez NodeSource
- instaluje globalnie `serve` i `pm2` (opcjonalne)
- tworzy katalog `/var/www/atellier` i użytkownika `atelier` (jeśli nie istnieje)
- tworzy prostą konfigurację nginx (plik: `/etc/nginx/sites-available/atellier`)

3) Deployment projektu — przykład działań ręcznych po sklonowaniu repo:

```bash
# na serwerze jako user atelier
cd ~
# sklonuj repo (zastąp URL)
git clone <YOUR_REPO_URL> site
cd site
npm ci
npm run build

# skopiuj pliki do katalogu serwowanego przez nginx
sudo cp -r dist/* /var/www/atellier/
sudo chown -R atelier:atelier /var/www/atellier

# przeładuj nginx
sudo systemctl reload nginx
```

4) Alternatywa: uruchom statyczny serwer Node (serve) za pomocą pm2

```bash
# uruchom serowanie katalogu dist przez pm2
pm2 serve /var/www/atellier 3000 --name atellier --spa
sudo pm2 save

# skonfiguruj nginx jako reverse-proxy na 127.0.0.1:3000 (przykład)
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

5) Certyfikat HTTPS (opcjonalne):

- Jeśli masz domenę, użyj Certbota:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d example.com
```

6) Troubleshooting

- Sprawdź logi nginx: `sudo journalctl -u nginx` lub `sudo tail -n 200 /var/log/nginx/error.log`
- Jeśli pliki nie pojawiają się, sprawdź prawa: `ls -la /var/www/atellier`
- Jeśli build się nie udaje, sprawdź wersję Node (`node -v`) i logi `npm ci` / `npm run build`

7) Bezpieczeństwo

- Nie uruchamiaj skryptów jako root bez weryfikacji. Skrypt używa `sudo` w miejscach, gdzie to potrzebne.

---

Masz pytania dotyczące konkretnego kroku? Mogę przygotować gotowy `nginx` config z Twoją domeną, lub zdalny playbook Ansible jeśli wolisz automatyzację wieloserwerową.
