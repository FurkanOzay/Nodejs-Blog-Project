# Blog Projesi

## Projenin Amacı
Bu proje, kullanıcıların kayıt olabileceği, giriş yapabileceği, blog yazıları yazabileceği, bu yazılara kategoriler ve etiketler ekleyebileceği bir blog uygulamasıdır. Kullanıcılar ayrıca blog yazılarına resim ekleyebilirler.

## Kullanılan Teknolojiler
- **Backend**: Node.js, Express.js, MySQL
- **Frontend**: Next.js
- **Diğer**: JWT (kimlik doğrulama), Multer (dosya yükleme)

## Proje Yapısı
blog_project/
│
├── controllers/
│ ├── blogController.js
│ ├── categoryController.js
│ ├── tagController.js
│ └── userController.js
│
├── middleware/
│ └── upload.js
│
├── models/
│ ├── blogModel.js
│ ├── categoryModel.js
│ ├── tagModel.js
│ └── userModel.js
│
├── routes/
│ ├── blogRoutes.js
│ ├── categoryRoutes.js
│ ├── tagRoutes.js
│ └── userRoutes.js
│
├── config/
│ └── db.js
│
├── .env
├── package.json
└── server.js

## Özellikler

### Kullanıcı İşlemleri
- Kayıt olma ve giriş yapma (JWT ile kimlik doğrulama)
- Dosyalar: `userModel.js`, `userController.js`, `userRoutes.js`

### Blog Yazıları
- Blog yazısı oluşturma, getirme ve listeleme
- Blog yazılarına resim ekleme
- Dosyalar: `blogModel.js`, `blogController.js`, `blogRoutes.js`, `upload.js`

### Kategoriler
- Kategori oluşturma, getirme ve listeleme
- Dosyalar: `categoryModel.js`, `categoryController.js`, `categoryRoutes.js`

### Etiketler
- Etiket oluşturma, getirme ve listeleme
- Dosyalar: `tagModel.js`, `tagController.js`, `tagRoutes.js`