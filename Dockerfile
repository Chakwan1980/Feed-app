# Usa la imagen base de Node.js
FROM node:22-bookworm-slim

# Crea un directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Expon el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "node", "app.js" ]
