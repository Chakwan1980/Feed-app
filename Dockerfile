# Verwende das Basis-Image von Node.js
FROM node:22-bookworm-slim

# Erstelle ein Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere die Dateien package.json und package-lock.json, um die Abhängigkeiten zu installieren
COPY package*.json ./

# Installiere die Abhängigkeiten der Anwendung
RUN npm install

# Kopiere den restlichen Quellcode in den Container
COPY . .

# Öffne den Port, auf dem die Anwendung laufen wird
EXPOSE 3000

# Befehl zum Ausführen der Anwendung
CMD [ "npm", "run", "dev" ]
