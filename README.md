# Sistem Informasi Absensi Karyawan

Project ini adalah aplikasi absensi karyawan berbasis **Node.js + Express.js + MySQL**. Project sudah dirapikan ke pola **MVC + Service Layer** dan dilengkapi **REST API** untuk persiapan pengembangan Mobile App.

## Fitur Utama

### Website HBS
- Login dan logout user.
- Dashboard Admin.
- Dashboard Pekerja.
- CRUD user oleh Admin.
- Aktivasi / nonaktif user.
- Reset password oleh Admin.
- Reset password mandiri oleh user.
- Clock In dan Clock Out pekerja.
- Riwayat absensi pribadi pekerja.
- Riwayat absensi seluruh pekerja untuk Admin.
- Filter riwayat berdasarkan bulan, nama, dan jabatan.
- Export laporan ke Excel.
- Export laporan ke PDF.
- Reverse geocoding koordinat GPS menjadi alamat.

### REST API
- `POST /api/login`
- `GET /api/me`
- `POST /api/logout`
- `GET /api/pekerja/dashboard`
- `GET /api/pekerja/absensi/today`
- `POST /api/pekerja/clockin`
- `POST /api/pekerja/clockout`
- `GET /api/pekerja/riwayat`
- `GET /api/admin/dashboard`
- `GET /api/admin/users`
- `POST /api/admin/users`
- `PUT /api/admin/users/:id`
- `DELETE /api/admin/users/:id`
- `POST /api/admin/users/:id/reset-password`
- `GET /api/admin/riwayat`

## Struktur Project

```text
absen-karyawan-mvc/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── apiAdminController.js
│   ├── apiAuthController.js
│   ├── apiPekerjaController.js
│   ├── webAdminController.js
│   ├── webAuthController.js
│   └── webPekerjaController.js
│
├── services/
│   ├── attendanceService.js
│   ├── exportService.js
│   ├── geocodeService.js
│   └── userService.js
│
├── middleware/
│   ├── admin.js
│   ├── apiAdmin.js
│   ├── apiAuth.js
│   └── auth.js
│
├── routes/
│   ├── admin.js
│   ├── apiAdmin.js
│   ├── apiAuth.js
│   ├── apiPekerja.js
│   ├── auth.js
│   ├── geocode.js
│   └── pekerja.js
│
├── public/
│   ├── css/
│   └── images/
│
├── views/
│   ├── admin/
│   ├── pekerja/
│   ├── login.hbs
│   └── reset-password.hbs
│
├── database/
│   └── db_absensi_pekerja.sql
│
├── .env.example
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Cara Install Project Baru

### 1. Extract ZIP

Extract file ZIP ke folder kerja, misalnya:

```bash
C:\dev\absen-karyawan-mvc
```

### 2. Install Dependency

```bash
npm install
```

### 3. Buat Database MySQL

Buka phpMyAdmin atau MySQL Client, lalu import file:

```text
database/db_absensi_pekerja.sql
```

### 4. Buat file `.env`

Copy dari `.env.example` menjadi `.env`:

```bash
copy .env.example .env
```

Isi contoh:

```env
PORT=3000
SESSION_SECRET=secret_absensi
JWT_SECRET=absensi_karyawan_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_absensi_pekerja
```

### Opsional: Buat User Admin

```bash
npm run create-admin
```

### Opsional: Seed Data Karyawan

```bash
npm run seed-users
```

Login admin default:

```text
admin@twink.co.id / 123456
```

### 5. Jalankan Project

```bash
npm start
```

Akses website:

```text
http://localhost:3000
```

## Cara Test REST API

### Login API

```http
POST http://localhost:3000/api/login
```

Body JSON:

```json
{
  "email": "admin@twink.co.id",
  "password": "123456"
}
```

Response akan mengembalikan token JWT.

### Endpoint dengan Token

Gunakan header:

```http
Authorization: Bearer TOKEN_DARI_LOGIN
```

Contoh:

```http
GET http://localhost:3000/api/me
```

## Teknologi

- Node.js
- Express.js
- MySQL
- HBS / Handlebars
- express-session
- bcrypt
- JWT / jsonwebtoken
- Axios
- Moment.js
- ExcelJS
- PDFKit / PDFKit Table
- HTML, CSS, JavaScript
