const bcrypt = require('bcrypt');
const moment = require('moment');
const userService = require('../services/userService');
const attendanceService = require('../services/attendanceService');
const exportService = require('../services/exportService');

async function dashboard(req, res) {
    try {
        const absensi = await attendanceService.getTodayAdminAbsensi();
        const stats = await attendanceService.getAdminStats();

        for (const item of absensi) {
            item.tanggal = moment(item.tanggal).format('DD-MM-YYYY');
            item.lokasi_masuk = item.lokasi_masuk || '-';
            item.lokasi_keluar = item.lokasi_keluar || '-';
            item.jam_masuk = item.jam_masuk || '-';
            item.jam_keluar = item.jam_keluar || '-';
        }

        res.render('admin/dashboard', {
            user: req.session.user,
            absensi,
            ...stats
        });
    } catch (error) {
        console.log(error);
        res.send('Database Error');
    }
}

async function users(req, res) {
    try {
        const rows = await userService.getAllUsers();
        res.render('admin/users', {
            users: rows
        });
    } catch (error) {
        console.log(error);
        res.send('Database Error');
    }
}

function showAddUser(req, res) {
    res.render('admin/add-user');
}

async function addUser(req, res) {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);

        await userService.createUser({
            ...req.body,
            password: hash,
            role: req.body.role || 'pekerja',
            status: req.body.status || 'aktif'
        });

        res.redirect('/admin/users');
    } catch (error) {
        console.log(error);
        res.send('Gagal Menyimpan User');
    }
}

async function showEditUser(req, res) {
    try {
        const data = await userService.findById(req.params.id);

        if (!data) {
            return res.send('User tidak ditemukan');
        }

        res.render('admin/edit-user', {
            data
        });
    } catch (error) {
        console.log(error);
        res.send('Database Error');
    }
}

async function updateUser(req, res) {
    try {
        await userService.updateUser(
            req.params.id,
            req.body
        );

        res.redirect('/admin/users');
    } catch (error) {
        console.log(error);
        res.send('Gagal update user');
    }
}

async function deleteUser(req, res) {
    try {
        await userService.deleteUser(req.params.id);
        res.redirect('/admin/users');
    } catch (error) {
        console.log(error);
        res.send('Gagal menghapus pekerja');
    }
}

async function resetUserPassword(req, res) {
    try {
        const passwordBaru =
            req.body.password_baru || '123456';

        const hash = await bcrypt.hash(
            passwordBaru,
            10
        );

        await userService.updatePassword(
            req.params.id,
            hash
        );

        res.redirect('/admin/users');
    } catch (error) {
        console.log(error);
        res.send('Gagal reset password user');
    }
}

async function riwayat(req, res) {
    try {
        const rows = await attendanceService.getAdminRiwayat(
            req.query
        );

        for (const item of rows) {
            item.tanggal = moment(item.tanggal).format('DD-MM-YYYY');
            item.lokasi_masuk = item.lokasi_masuk || '-';
            item.lokasi_keluar = item.lokasi_keluar || '-';
            item.jam_masuk = item.jam_masuk || '-';
            item.jam_keluar = item.jam_keluar || '-';
            item.keterangan_masuk = item.keterangan_masuk || '-';
            item.keterangan_keluar = item.keterangan_keluar || '-';
        }

        res.render('admin/riwayat', {
            user: req.session.user,
            data: rows,
            bulan: req.query.bulan,
            nama: req.query.nama,
            jabatan: req.query.jabatan
        });
    } catch (error) {
        console.log(error);
        res.send('Database Error');
    }
}

async function exportExcel(req, res) {
    try {
        const rows = await attendanceService.getAdminRiwayat(
            req.query
        );

        await exportService.writeRiwayatExcel(
            res,
            rows
        );
    } catch (error) {
        console.log(error);
        res.send('Database Error');
    }
}

async function exportPdf(req, res) {
    try {
        const rows = await attendanceService.getAdminRiwayat(
            req.query
        );

        await exportService.writeRiwayatPdf(
            res,
            rows,
            req.query
        );
    } catch (error) {
        console.log(error);
        res.send('Database Error');
    }
}

module.exports = {
    dashboard,
    users,
    showAddUser,
    addUser,
    showEditUser,
    updateUser,
    deleteUser,
    resetUserPassword,
    riwayat,
    exportExcel,
    exportPdf
};