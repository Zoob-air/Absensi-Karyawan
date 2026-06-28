const moment = require('moment');
const attendanceService = require('../services/attendanceService');

async function dashboard(req, res) {
    try {
        const today = await attendanceService.getTodayByUser(req.user.id);

        let status = 'Belum Absen';
        let jamMasuk = '-';
        let jamKeluar = '-';

        if (today) {
            jamMasuk = today.jam_masuk || '-';
            jamKeluar = today.jam_keluar || '-';
            if (today.jam_masuk && !today.jam_keluar) status = 'Sudah Clock In';
            if (today.jam_masuk && today.jam_keluar) status = 'Sudah Clock Out';
        }

        res.json({
            success: true,
            data: {
                nama: req.user.nama,
                role: req.user.role,
                jabatan: req.user.jabatan,
                status,
                jamMasuk,
                jamKeluar
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
}

async function today(req, res) {
    try {
        const data = await attendanceService.getTodayByUser(req.user.id);

        res.json({
            success: true,
            sudahClockIn: !!(data && data.jam_masuk),
            sudahClockOut: !!(data && data.jam_keluar),
            data: data || null
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
}

async function clockIn(req, res) {
    try {
        const { latitude, longitude, keterangan } = req.body;

        if (!latitude || !longitude || !keterangan) {
            return res.status(400).json({
                success: false,
                message: 'Latitude, longitude, dan keterangan wajib diisi'
            });
        }

        const todayData = await attendanceService.getTodayByUser(req.user.id);

        if (todayData) {
            return res.status(409).json({
                success: false,
                message: 'Anda sudah melakukan Clock In hari ini'
            });
        }

        await attendanceService.clockIn(req.user.id, req.body);

        res.json({
            success: true,
            message: 'Clock In berhasil'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Gagal Clock In' });
    }
}

async function clockOut(req, res) {
    try {
        const { latitude, longitude } = req.body;

        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: 'Latitude dan longitude wajib diisi'
            });
        }

        const todayData = await attendanceService.getTodayByUser(req.user.id);

        if (!todayData) {
            return res.status(400).json({
                success: false,
                message: 'Anda belum melakukan Clock In hari ini'
            });
        }

        if (todayData.jam_keluar) {
            return res.status(409).json({
                success: false,
                message: 'Anda sudah melakukan Clock Out hari ini'
            });
        }

        await attendanceService.clockOut(todayData.id, req.body);

        res.json({
            success: true,
            message: 'Clock Out berhasil'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Gagal Clock Out' });
    }
}

async function riwayat(req, res) {
    try {
        const rows = await attendanceService.getRiwayatByUser(req.user.id, req.query.bulan);

        const data = rows.map(row => ({
            id: row.id,
            tanggal: moment(row.tanggal).format('DD-MM-YYYY'),
            jam_masuk: row.jam_masuk || '-',
            jam_keluar: row.jam_keluar || '-',
            latitude_masuk: row.latitude_masuk,
            longitude_masuk: row.longitude_masuk,
            latitude_keluar: row.latitude_keluar,
            longitude_keluar: row.longitude_keluar,
            keterangan_masuk: row.keterangan_masuk || '-',
            keterangan_keluar: row.keterangan_keluar || '-'
        }));

        res.json({ success: true, total: data.length, data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
}

module.exports = { dashboard, today, clockIn, clockOut, riwayat };
