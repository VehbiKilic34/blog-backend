# Blog API – BE-7734P

Bu proje, basit bir blog sistemi için RESTful API sunar. Kategorilere bağlı olarak blog gönderileri ve bu gönderilere yapılan yorumlar üzerinde işlem yapılabilir. Eğitim amaçlı geliştirilmiştir.

---

## 🚀 Kullanılan Teknolojiler

- TypeScript
- Express.js
- PostgreSQL
- Knex.js

---

## 🛠️ Kurulum

```bash
# Bağımlılıkları kur
npm install

# Veritabanı migration'larını çalıştır
npx knex migrate:latest

# Geliştirme modunda sunucuyu başlat
npm run dev