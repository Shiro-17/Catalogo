# 1. Traemos una "computadora miniatura" que ya tiene Node.js
FROM node:20-alpine

# 2. Creamos una carpeta dentro de esa mini-compu para tu app
WORKDIR /app

# 3. Copiamos los archivos donde dices qué librerías usa tu gestión de almacén
COPY package*.json ./

# 4. Le decimos a Docker que instale todas esas librerías (Express, MySQL, etc.)
RUN npm install

# 5. Ahora sí, pasamos todo tu código (JS, HTML, React) adentro
COPY . .

# 6. Tu app de almacén suele avisar por el puerto 3000, así que lo abrimos
EXPOSE 3000

# 7. ¡El botón de encendido! Ejecuta el comando para que la app empiece a correr
CMD ["npm", "start"]


