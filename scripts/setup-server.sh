#!/usr/bin/env bash
set -euo pipefail

# setup-server.sh
# Automatyczny skrypt przygotowujący serwer Ubuntu do serwowania statycznej strony Astro
# Użycie (lokalnie): scp scripts/setup-server.sh user@server:/tmp && ssh user@server 'bash /tmp/setup-server.sh'

echo "[setup] Aktualizuję pakiety i instaluję podstawowe narzędzia..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl ca-certificates gnupg lsb-release git nginx

# Install Node.js LTS (NodeSource) - Node 20 LTS
echo "[setup] Instalacja Node.js LTS (Node 20)..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential

# Ensure npm is available
if ! command -v npm >/dev/null 2>&1; then
  echo "[setup] npm nie znaleziony — instaluję npm via corepack..."
  corepack enable || true
fi

# Optional: install pm2 (process manager) and serve
echo "[setup] Instaluję globalne narzędzia (serve, pm2)..."
sudo npm install -g serve pm2 --unsafe-perm=true

# Create a system user for the site (optional)
SITE_USER="atelier"
if id -u "$SITE_USER" >/dev/null 2>&1; then
  echo "[setup] Użytkownik $SITE_USER już istnieje"
else
  echo "[setup] Tworzę użytkownika $SITE_USER"
  sudo adduser --disabled-password --gecos "" "$SITE_USER" || true
fi

# Setup directory for site
SITE_DIR="/var/www/atellier"
sudo mkdir -p "$SITE_DIR"
sudo chown "$SITE_USER":"$SITE_USER" "$SITE_DIR"

# Nginx site configuration (simple)
NGINX_CONF="/etc/nginx/sites-available/atellier"
if [ ! -f "$NGINX_CONF" ]; then
  echo "[setup] Tworzę konfigurację nginx dla atellier"
  sudo tee "$NGINX_CONF" >/dev/null <<'NGINX'
server {
  listen 80;
  server_name _;

  root /var/www/atellier;
  index index.html;

  location / {
    try_files $uri $uri/ =404;
  }

  location ~* \.(js|css|png|jpg|jpeg|webp|svg|ico|gif)$ {
    expires 30d;
    access_log off;
  }
}
NGINX
  sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/atellier
  sudo nginx -t
  sudo systemctl reload nginx
else
  echo "[setup] Konfiguracja nginx już istnieje"
fi

cat <<EOF

[SUCCESS] Skrypt zakończył instalację pakietów.

Co dalej (ręcznie):
1) Sklonuj repozytorium i zbuduj stronę:
   sudo -u $SITE_USER -H bash -c '\\n  cd ~ && git clone <YOUR_REPO_URL> site && cd site && npm install && npm run build && cp -r dist/* $SITE_DIR'

   (Zastąp <YOUR_REPO_URL> swoim URL do git)

2) Ustaw uprawnienia katalogu:
   sudo chown -R $SITE_USER:$SITE_USER $SITE_DIR

3) Po skopiowaniu plików sprawdź nginx i odśwież:
   sudo systemctl reload nginx

Alternatywa: możesz uruchomić statyczny serwer node (serve) w tle poprzez pm2:
   sudo -u $SITE_USER -H bash -c 'pm2 serve $SITE_DIR 3000 --name atellier --spa'
   sudo pm2 save
   # i skonfiguruj reverse proxy w nginx do 127.0.0.1:3000 jeśli chcesz

EOF
