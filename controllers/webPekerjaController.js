const db = require('../config/db');
const moment = require('moment');
const { getAddress } = require('../routes/geocode');

exports.dashboard = (req, res) => {
    db.query(
        `
        SELECT *
        FROM absensi
        WHERE user_id = ?
        AND tanggal = CURDATE()
        `,
        [req.session.user.id],
        (err, rows) => {
            if (err) {
                console.log(err);
                return res.send('Database Error');
            }

            let status = 'Belum Absen';
            let jamMasuk = '-';
            let jamKeluar = '-';

            if (rows.length > 0) {
                jamMasuk = rows[0].jam_masuk || '-';
                jamKeluar = rows[0].jam_keluar || '-';

                if (rows[0].jam_masuk && !rows[0].jam_keluar) {
                    status = 'Sudah Clock In';
                }

                if (rows[0].jam_masuk && rows[0].jam_keluar) {
                    status = 'Sudah Clock Out';
                }
            }

            res.render('pekerja/dashboard', {
                user: req.session.user,
                status,
                jamMasuk,
                jamKeluar
            });
        }
    );
};

exports.showAbsensi = (req, res) => {
    db.query(
        `
        SELECT *
        FROM absensi
        WHERE user_id = ?
        AND tanggal = CURDATE()
        `,
        [req.session.user.id],
        (err, rows) => {
            if (err) {
                console.log(err);
                return res.send('Database Error');
            }

            res.render('pekerja/absensi', {
                user: req.session.user,
                sudahClockIn: rows.length > 0 && rows[0].jam_masuk,
                sudahClockOut: rows.length > 0 && rows[0].jam_keluar
            });
        }
    );
};

exports.clockIn = async (req, res) => {
    db.query(
        `
        SELECT *
        FROM absensi
        WHERE user_id = ?
        AND tanggal = CURDATE()
        `,
        [req.session.user.id],
        async (err, rows) => {
            if (err) {
                console.log(err);
                return res.send('Database Error');
            }

            if (rows.length > 0) {
                return res.redirect('/pekerja/absensi');
            }

            const lokasiMasuk = await getAddress(
                req.body.latitude,
                req.body.longitude
            );

            db.query(
                `
                INSERT INTO absensi
                (
                    user_id,
                    tanggal,
                    jam_masuk,
                    latitude_masuk,
                    longitude_masuk,
                    lokasi_masuk,
                    keterangan_masuk
                )
                VALUES
                (
                    ?,
                    CURDATE(),
                    CURTIME(),
                    ?,
                    ?,
                    ?,
                    ?
                )
                `,
                [
                    req.session.user.id,
                    req.body.latitude,
                    req.body.longitude,
                    lokasiMasuk,
                    req.body.keterangan
                ],
                (err) => {
                    if (err) {
                        console.log(err);
                        return res.send('Gagal Clock In');
                    }

                    res.redirect('/pekerja/dashboard');
                }
            );
        }
    );
};

exports.clockOut = (req, res) => {
    db.query(
        `
        SELECT *
        FROM absensi
        WHERE user_id = ?
        AND tanggal = CURDATE()
        `,
        [req.session.user.id],
        async (err, rows) => {
            if (err) {
                console.log(err);
                return res.send('Database Error');
            }

            if (rows.length === 0) {
                return res.redirect('/pekerja/absensi');
            }

            if (rows[0].jam_keluar) {
                return res.redirect('/pekerja/absensi');
            }

            const lokasiKeluar = await getAddress(
                req.body.latitude,
                req.body.longitude
            );

            db.query(
                `
                UPDATE absensi
                SET
                    jam_keluar = CURTIME(),
                    latitude_keluar = ?,
                    longitude_keluar = ?,
                    lokasi_keluar = ?,
                    keterangan_keluar = ?
                WHERE id = ?
                `,
                [
                    req.body.latitude,
                    req.body.longitude,
                    lokasiKeluar,
                    req.body.keterangan,
                    rows[0].id
                ],
                (err) => {
                    if (err) {
                        console.log(err);
                        return res.send('Gagal Clock Out');
                    }

                    res.redirect('/pekerja/dashboard');
                }
            );
        }
    );
};

exports.riwayat = (req, res) => {
    let sql = `
        SELECT *
        FROM absensi
        WHERE user_id = ?
    `;

    let params = [req.session.user.id];

    if (req.query.bulan) {
        sql += `
            AND DATE_FORMAT(tanggal,'%Y-%m') = ?
        `;
        params.push(req.query.bulan);
    }

    sql += `
        ORDER BY tanggal DESC
    `;

    db.query(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
            return res.send('Database Error');
        }

        rows.forEach(item => {
            item.tanggal = moment(item.tanggal).format('DD-MM-YYYY');
            item.lokasi_masuk = item.lokasi_masuk || '-';
            item.lokasi_keluar = item.lokasi_keluar || '-';
            item.jam_masuk = item.jam_masuk || '-';
            item.jam_keluar = item.jam_keluar || '-';
            item.keterangan_masuk = item.keterangan_masuk || '-';
            item.keterangan_keluar = item.keterangan_keluar || '-';
        });

        res.render('pekerja/riwayat', {
            user: req.session.user,
            data: rows,
            bulan: req.query.bulan
        });
    });
};