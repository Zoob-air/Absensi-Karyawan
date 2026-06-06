CREATE DATABASE IF NOT EXISTS db_absensi_pekerja;
USE db_absensi_pekerja;

CREATE TABLE users (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nik VARCHAR(50),
 nama VARCHAR(100) NOT NULL,
 email VARCHAR(100) UNIQUE NOT NULL,
 no_hp VARCHAR(20),
 jabatan VARCHAR(100),
 password VARCHAR(255) NOT NULL,
 role ENUM('admin','pekerja') DEFAULT 'pekerja',
 status ENUM('aktif','nonaktif') DEFAULT 'aktif',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE absensi (
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT NOT NULL,
 tanggal DATE NOT NULL,
 jam_masuk TIME NULL,
 jam_keluar TIME NULL,
 latitude_masuk DECIMAL(10,8),
 longitude_masuk DECIMAL(11,8),
 latitude_keluar DECIMAL(10,8),
 longitude_keluar DECIMAL(11,8),
 keterangan_masuk TEXT,
 keterangan_keluar TEXT,
 FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
