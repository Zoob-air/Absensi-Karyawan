const moment = require('moment');
const attendanceService = require('../services/attendanceService');
const { getAddress } = require('../services/geocodeService');

async function dashboard(req, res) {
    try {
        const today = await attendanceService.getTodayByUser(req.session.user.id);

        let status = 'Belum Absen';
        let jamMasuk = '-';
        let jamKeluar = '-';

        if (today) {
            jamMasuk = today.jam_masuk || '-';
            jamKeluar = today.jam_keluar || '-';

            if (today.jam_masuk && !today.jam_keluar) status = 'Sudah Clock In';
            if (today.jam_masuk && today.jam_keluar) status = 'Sudah Clock Out';
        }

        res.render('pekerja/dashboard', {
            user: req.session.user,
            status,
            jamMasuk,
            jamKeluar
        });
    } catch (error) {
        console.log(error);
        res.send('Database Error');
    }
}

async function showAbsensi(req, res) {
    try {
        const today = await attendanceService.getTodayByUser(req.session.user.id);

        res.render('pekerja/absensi', {
            user: req.session.user,
            sudahClockIn: !!(today && today.jam_masuk),
            sudahClockOut: !!(today && today.jam_keluar)
        });
    } catch (error) {
        console.log(error);
        res.send('Database Error');
    }
}

async function clockIn(req, res) {
    try {
        const today = await attendanceService.getTodayByUser(req.session.user.id);

        if (today) {
            return res.redirect('/pekerja/absensi');
        }

        await attendanceService.clockIn(req.session.user.id, req.body);
        res.redirect('/pekerja/dashboard');
    } catch (error) {
        console.log(error);
        res.send('Gagal Clock In');
    }
}

async function clockOut(req, res) {
    try {
        const today = await attendanceService.getTodayByUser(req.session.user.id);

        if (!today || today.jam_keluar) {
            return res.redirect('/pekerja/absensi');
        }

        await attendanceService.clockOut(today.id, req.body);
        res.redirect('/pekerja/dashboard');
    } catch (error) {
        console.log(error);
        res.send('Gagal Clock Out');
    }
}

async function riwayat(req, res) {
    try {
        const rows = await attendanceService.getRiwayatByUser(req.session.user.id, req.query.bulan);

        for (const item of rows) {
            item.tanggal = moment(item.tanggal).format('DD-MM-YYYY');
            item.lokasi_masuk = item.latitude_masuk && item.longitude_masuk
                ? await getAddress(item.latitude_masuk, item.longitude_masuk)
                : '-';
            item.lokasi_keluar = item.latitude_keluar && item.longitude_keluar
                ? await getAddress(item.latitude_keluar, item.longitude_keluar)
                : '-';
        }

        res.render('pekerja/riwayat', {
            user: req.session.user,
            data: rows,
            bulan: req.query.bulan
        });
    } catch (error) {
        console.log(error);
        res.send('Database Error');
    }
}

module.exports = {
    dashboard,
    showAbsensi,
    clockIn,
    clockOut,
    riwayat
};
