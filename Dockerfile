# Node'un resmi image'ını kullan
FROM node:20

# Uygulama klasörünü ayarla (container içinde)
WORKDIR /app

# package.json ve lock dosyasını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# src klasörünü ve diğer tüm dosyaları kopyala
COPY . .

# Uygulamanın dinleyeceği port
EXPOSE 3000

# Uygulama başlatma komutu
CMD ["npm", "run", "dev"]
