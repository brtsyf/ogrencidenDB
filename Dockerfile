# Node'un resmi image'ını kullan
FROM node:20

# Uygulama dizini oluştur
WORKDIR /src

# package.json ve package-lock.json'u kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Geri kalan tüm dosyaları kopyala
COPY . .

# Uygulama hangi portta çalışıyorsa o portu belirt
EXPOSE 3000

# Uygulama başlatma komutu
CMD ["npm", "run", "dev"]
