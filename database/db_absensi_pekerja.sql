-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 29, 2026 at 12:10 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_absensi_pekerja`
--

-- --------------------------------------------------------

--
-- Table structure for table `absensi`
--

CREATE TABLE `absensi` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `jam_masuk` time DEFAULT NULL,
  `jam_keluar` time DEFAULT NULL,
  `latitude_masuk` decimal(10,8) DEFAULT NULL,
  `longitude_masuk` decimal(11,8) DEFAULT NULL,
  `latitude_keluar` decimal(10,8) DEFAULT NULL,
  `longitude_keluar` decimal(11,8) DEFAULT NULL,
  `keterangan_masuk` text DEFAULT NULL,
  `keterangan_keluar` text DEFAULT NULL,
  `lokasi_masuk` text DEFAULT NULL,
  `lokasi_keluar` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `absensi`
--

INSERT INTO `absensi` (`id`, `user_id`, `tanggal`, `jam_masuk`, `jam_keluar`, `latitude_masuk`, `longitude_masuk`, `latitude_keluar`, `longitude_keluar`, `keterangan_masuk`, `keterangan_keluar`, `lokasi_masuk`, `lokasi_keluar`) VALUES
(1, 51, '2026-06-29', '09:05:34', '18:37:01', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(2, 61, '2026-06-29', '09:06:35', '17:03:45', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(3, 52, '2026-06-29', '07:10:30', '16:29:44', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(4, 62, '2026-06-29', '08:24:19', '16:14:43', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(5, 58, '2026-06-29', '08:08:28', '17:11:09', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(6, 59, '2026-06-29', '07:06:03', '17:10:54', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(7, 57, '2026-06-29', '08:12:41', '18:18:39', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(8, 54, '2026-06-29', '09:00:32', '16:43:19', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(9, 56, '2026-06-29', '09:58:15', '16:42:44', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(10, 55, '2026-06-29', '09:51:06', '16:34:39', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(11, 60, '2026-06-29', '08:07:30', '16:39:43', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(12, 53, '2026-06-29', '08:06:14', '17:03:09', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(13, 63, '2026-06-29', '09:56:31', '18:57:19', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(14, 64, '2026-06-29', '07:33:42', '17:44:48', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(15, 65, '2026-06-29', '08:59:05', '17:06:11', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(16, 66, '2026-06-29', '08:48:36', '17:28:57', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(17, 67, '2026-06-29', '09:14:43', '18:37:29', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(18, 68, '2026-06-29', '07:18:13', '17:31:27', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(19, 69, '2026-06-29', '08:46:09', '17:18:43', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(20, 70, '2026-06-29', '09:44:42', '18:16:18', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(21, 71, '2026-06-29', '09:59:59', '16:43:42', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(22, 72, '2026-06-29', '09:56:35', '18:12:33', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(23, 73, '2026-06-29', '08:35:59', '16:37:46', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(24, 74, '2026-06-29', '08:50:20', '18:41:46', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(25, 75, '2026-06-29', '09:30:39', '16:18:48', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(26, 76, '2026-06-29', '07:41:46', '17:34:49', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(27, 77, '2026-06-29', '07:56:51', '17:15:11', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(28, 78, '2026-06-29', '08:33:47', '17:46:47', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(29, 79, '2026-06-29', '07:11:45', '17:10:48', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(30, 80, '2026-06-29', '09:30:57', '17:51:12', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(31, 81, '2026-06-29', '08:02:52', '16:36:32', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(32, 82, '2026-06-29', '09:06:22', '17:43:19', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(33, 83, '2026-06-29', '09:15:17', '18:00:08', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(34, 84, '2026-06-29', '07:07:52', '17:02:31', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(35, 85, '2026-06-29', '09:05:26', '18:24:41', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(36, 86, '2026-06-29', '09:35:03', '18:35:55', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(37, 87, '2026-06-29', '07:29:53', '16:30:05', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(38, 88, '2026-06-29', '09:11:31', '17:18:12', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(39, 89, '2026-06-29', '09:14:48', '16:13:26', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(40, 90, '2026-06-29', '08:23:43', '18:08:43', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(41, 91, '2026-06-29', '09:20:53', '17:19:01', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(42, 92, '2026-06-29', '09:42:57', '16:08:06', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(43, 93, '2026-06-29', '09:36:27', '17:42:53', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(44, 94, '2026-06-29', '08:41:29', '18:34:40', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(45, 95, '2026-06-29', '07:36:26', '16:32:17', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(46, 96, '2026-06-29', '07:21:37', '16:54:42', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(47, 97, '2026-06-29', '08:34:45', '17:22:41', -6.40250000, 106.79420000, -6.40250000, 106.79420000, 'Simulasi Clock In', 'Simulasi Clock Out', NULL, NULL),
(49, 100, '2026-06-29', '05:08:32', '05:08:41', -6.25610000, 106.87790000, -6.23284700, 106.72946433, 'ngantar plat baja', 'pulang', 'Gang Delima, RW 12, Kebon Pala, Makasar, Jakarta Timur, Daerah Khusus Ibukota Jakarta, Jawa, 13240, Indonesia', 'Gang Teman II, Larangan Utara, Larangan, Tangerang, Banten, Jawa, 15154, Indonesia');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nik` varchar(50) DEFAULT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `jabatan` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','pekerja') DEFAULT 'pekerja',
  `status` enum('aktif','nonaktif') DEFAULT 'aktif',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nik`, `nama`, `email`, `no_hp`, `jabatan`, `password`, `role`, `status`, `created_at`) VALUES
(1, 'ADM001', 'Administrator', 'admin@absensi.com', '08123456789', 'Administrator', '$2b$10$bqCbrGcL2m2YureoR/cRBuX7Pvv6xW4m8YaCPM4/K4sc0yxtAImEG', 'admin', 'aktif', '2026-05-30 12:49:44'),
(51, '001', 'Abdul Manap', 'abdul.manap@twink.co.id', '086016884386', 'OB/Operator HRGA', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(52, '002', 'Abdul Sukur', 'abdul.sukur@twink.co.id', '082015881327', 'Operator HRGA', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(53, '003', 'Ahmad Syarif', 'ahmad.syarif@twink.co.id', '082399317787', 'Operator Produksi', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(54, '004', 'Ali Romli', 'ali.romli@twink.co.id', '081675128270', 'Operator Logistik', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(55, '005', 'Henricus Amridzal Hertanto', 'henricus.amridzal.hertanto@twink.co.id', '085835534412', 'Manager Logistik', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(56, '006', 'Apud Syarifudin', 'apud.syarifudin@twink.co.id', '085857154438', 'Operator Logistik', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(57, '007', 'Bustomi', 'bustomi@twink.co.id', '089051523579', 'Operator Logistik', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(58, '008', 'Christian Budiono', 'christian.budiono@twink.co.id', '087785755648', 'Manager', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(59, '009', 'Derfen Una Nitcae', 'derfen.una.nitcae@twink.co.id', '086817420071', 'Outsource Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(60, '010', 'Endang Setiawan', 'endang.setiawan@twink.co.id', '086814242457', 'Operator Operator Forklift', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(61, '011', 'Faisyal Rafiq', 'faisyal.rafiq@twink.co.id', '087684051713', 'Operator Lokalisasi', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(62, '012', 'Jefri Harisandi', 'jefri.harisandi@twink.co.id', '082977610020', 'OB/Operator Logistik', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(63, '013', 'Jodhy Rhenald Ariska', 'jodhy.rhenald.ariska@twink.co.id', '088144232478', 'Operator Testing', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(64, '014', 'Joey Michael Ariska', 'joey.michael.ariska@twink.co.id', '083682169046', 'Staff Logistik', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(65, '015', 'Maman Sumantri', 'maman.sumantri@twink.co.id', '086284769368', 'Outsource Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(66, '016', 'Muhammad Ismail', 'muhammad.ismail@twink.co.id', '082874531437', 'Operator Produksi', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(67, '017', 'Muhammad Ismail Saleh', 'muhammad.ismail.saleh@twink.co.id', '087968651957', 'Outsource Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(68, '018', 'Mulyadi', 'mulyadi@twink.co.id', '088072308426', 'Outsource Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(69, '019', 'Raditya Nandyta', 'raditya.nandyta@twink.co.id', '087723783755', 'Staff Ahli K3 Umum', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(70, '020', 'Rahmat Sofyan', 'rahmat.sofyan@twink.co.id', '084547444659', 'Operator Logistik', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(71, '021', 'Redi Saepul Bahri', 'redi.saepul.bahri@twink.co.id', '081206569649', 'Operator Produksi', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(72, '022', 'Rizky Saputra', 'rizky.saputra@twink.co.id', '082039946601', 'Operator Produksi', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(73, '023', 'Rudy Rachmat', 'rudy.rachmat@twink.co.id', '083937805613', 'Kepala Pabrik', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(74, '024', 'Rusyanto', 'rusyanto@twink.co.id', '088427628580', 'Operator Testing', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(75, '025', 'Semi', 'semi@twink.co.id', '085817761343', 'Outsource Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(76, '026', 'Sudarmaji', 'sudarmaji@twink.co.id', '089212454834', 'Staff Testing', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(77, '027', 'Mohammad Swandi Noor', 'mohammad.swandi.noor@twink.co.id', '082296056556', 'Manager Produksi', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(78, '028', 'Udin', 'udin@twink.co.id', '081512209401', 'Keamanan Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(79, '029', 'Untoro', 'untoro@twink.co.id', '085191210542', 'Staff Lokalisasi', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(80, '030', 'Wandi', 'wandi@twink.co.id', '087470751739', 'Operator Produksi', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(81, '031', 'Yohan Abukari', 'yohan.abukari@twink.co.id', '087127393177', 'Manager Quality Assurance', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(82, '032', 'Yudhistira Dharmakusuma', 'yudhistira.dharmakusuma@twink.co.id', '082509152666', 'Operator Testing', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(83, '033', 'Landi Yupito', 'landi.yupito@twink.co.id', '086483771097', 'Manager Testing', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(84, '034', 'Nanang Romadhlon', 'nanang.romadhlon@twink.co.id', '084197482740', 'Staff Testing', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(85, '035', 'Ega Fajrianti Nur', 'ega.fajrianti.nur@twink.co.id', '083344862774', 'Staff Accounting', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(86, '036', 'Bambang Setiawan', 'bambang.setiawan@twink.co.id', '085630582390', 'Staff Logistik', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(87, '037', 'Octarifia Kusumawardhani', 'octarifia.kusumawardhani@twink.co.id', '089152565880', 'Staff QHSE', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(88, '038', 'Agung Wisnu Cahyadi', 'agung.wisnu.cahyadi@twink.co.id', '088574269330', 'Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(89, '039', 'Yaminuddin Gulo', 'yaminuddin.gulo@twink.co.id', '082100616774', 'Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(90, '040', 'Pepen Ependi', 'pepen.ependi@twink.co.id', '089778377859', 'Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(91, '041', 'Adix', 'adix@twink.co.id', '087802532838', 'Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(92, '042', 'Abdurohman', 'abdurohman@twink.co.id', '089858218176', 'Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(93, '043', 'Vincentia Asdhi Kania', 'vincentia.asdhi.kania@twink.co.id', '084269818143', 'Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(94, '044', 'Fina Fitriatun', 'fina.fitriatun@twink.co.id', '085540507960', 'Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(95, '045', 'Iin mutiara Amelia', 'iin.mutiara.amelia@twink.co.id', '084270945851', 'Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(96, '046', 'Munadi', 'munadi@twink.co.id', '088777480249', 'Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(97, '047', 'Clara Silaban', 'clara.silaban@twink.co.id', '086123463465', 'Keamanan', '$2b$10$y08vCAkd8y4iT/CUjJpUY.cNT2lXxbmPpK74c0kq7EO4ZGqqq5DUW', 'pekerja', 'aktif', '2026-06-27 11:18:34'),
(98, 'ADM002', 'zubair', 'zubair@absensi.com', '', 'Development', '$2b$10$FimxnqOzxwfu07iajL9SIuBs.shmWADgjZ.pfxcjLsi.n5P9.U0/i', 'admin', 'aktif', '2026-06-28 16:39:06'),
(99, 'ADM001', 'Administrator', 'admin@twink.co.id', '081234567890', 'Administrator System', '$2b$10$7vge7Uj136NyL5Y7M0bxI.p/5xcLhm57dweFcuFTqv4en2NSfG6IC', 'admin', 'aktif', '2026-06-28 20:21:36'),
(100, '048', 'viqi choirul fuad', 'viqi.choirul.fuad@twink.co.id', '081234567890', 'Staff Logistik', '$2b$10$y7.olV.Du0J5SGrCd5j3vuXB2v49/PA.u1d9eXfyIpMnUJhyfX.Zu', 'pekerja', 'aktif', '2026-06-28 20:49:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absensi`
--
ALTER TABLE `absensi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_absensi_user_tanggal` (`user_id`,`tanggal`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absensi`
--
ALTER TABLE `absensi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `absensi`
--
ALTER TABLE `absensi`
  ADD CONSTRAINT `absensi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
