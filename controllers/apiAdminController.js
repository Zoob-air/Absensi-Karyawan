const bcrypt = require('bcrypt');
const moment = require('moment');
const userService = require('../services/userService');
const attendanceService = require('../services/attendanceService');

async function dashboard(req, res) {
    try {
        const stats = await attendanceService.getAdminStats();
        res.json({ success: true, data: stats });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
}

async function users(req, res) {
    try {
        const rows = await userService.getAllUsers();
        res.json({ success: true, total: rows.length, data: rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
}

async function addUser(req, res) {
    try {
        const { nama, email, password } = req.body;

        if (!nama || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Nama, email, dan password wajib diisi'
            });
        }

        const hash = await bcrypt.hash(password, 10);
        const id = await userService.createUser({ ...req.body, password: hash });

        res.json({
            success: true,
            message: 'User berhasil ditambahkan',
            id
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Gagal tambah user' });
    }
}

async function updateUser(req, res) {
    try {
        await userService.updateUser(req.params.id, req.body);
        res.json({ success: true, message: 'User berhasil diupdate' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Gagal update user' });
    }
}

async function deleteUser(req, res) {
    try {
        await userService.deleteUser(req.params.id);
        res.json({ success: true, message: 'User berhasil dihapus' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Gagal hapus user' });
    }
}

async function resetPassword(req, res) {
    try {
        const passwordBaru = req.body.password || '123456';
        const hash = await bcrypt.hash(passwordBaru, 10);
        await userService.updatePassword(req.params.id, hash);

        res.json({
            success: true,
            message: 'Password berhasil direset'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Gagal reset password' });
    }
}

async function riwayat(req, res) {
    try {
        const rows = await attendanceService.getAdminRiwayat(req.query);

        const data = rows.map(row => ({
            id: row.id,
            nik: row.nik,
            nama: row.nama,
            jabatan: row.jabatan,
            tanggal: moment(row.tanggal).format('DD-MM-YYYY'),
            jam_masuk: row.jam_masuk || '-',
            jam_keluar: row.jam_keluar || '-',
            lokasi_masuk: {
                latitude: row.latitude_masuk,
                longitude: row.longitude_masuk
            },
            lokasi_keluar: {
                latitude: row.latitude_keluar,
                longitude: row.longitude_keluar
            },
            keterangan_masuk: row.keterangan_masuk || '-',
            keterangan_keluar: row.keterangan_keluar || '-'
        }));

        res.json({ success: true, total: data.length, data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
}

module.exports = {
    dashboard,
    users,
    addUser,
    updateUser,
    deleteUser,
    resetPassword,
    riwayat
};
