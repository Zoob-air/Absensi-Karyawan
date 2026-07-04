const db = require('../config/db').promise();

function getKategori(persentase) {
    if (persentase >= 95) return 'Sangat Disiplin';
    if (persentase >= 85) return 'Disiplin';
    if (persentase >= 70) return 'Cukup';
    return 'Perlu Pembinaan';
}

function getWorkingDaysInMonth(bulan, holidays = []) {
    const [year, month] = bulan.split('-').map(Number);
    const lastDay = new Date(year, month, 0).getDate();

    let total = 0;

    for (let day = 1; day <= lastDay; day++) {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay();

        const tanggal = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isHoliday = holidays.includes(tanggal);

        if (!isWeekend && !isHoliday) {
            total++;
        }
    }

    return total;
}

async function getHolidaysByMonth(bulan) {
    const [rows] = await db.query(`
        SELECT tanggal
        FROM hari_libur
        WHERE DATE_FORMAT(tanggal, '%Y-%m') = ?
    `, [bulan]);

    return rows.map(row => {
        const d = new Date(row.tanggal);
        return d.toISOString().slice(0, 10);
    });
}

async function generateRekapBulanan(bulan) {
    const holidays = await getHolidaysByMonth(bulan);
    const hariKerjaEfektif = getWorkingDaysInMonth(bulan, holidays);

    const [users] = await db.query(`
        SELECT id, nik, nama, jabatan
        FROM users
        WHERE role = 'pekerja'
        AND status = 'aktif'
    `);

    for (const user of users) {
        const [rows] = await db.query(`
            SELECT *
            FROM absensi
            WHERE user_id = ?
            AND DATE_FORMAT(tanggal, '%Y-%m') = ?
        `, [user.id, bulan]);

        const hadirNormal = rows.filter(r => r.is_lembur == 0).length;
        const lembur = rows.filter(r => r.is_lembur == 1).length;

        const tepatWaktu = rows.filter(r =>
            r.is_lembur == 0 &&
            r.jam_masuk &&
            r.jam_masuk <= '08:00:00'
        ).length;

        const terlambat = hadirNormal - tepatWaktu;

        const clockoutLengkap = rows.filter(r =>
            r.is_lembur == 0 &&
            r.jam_keluar
        ).length;

        const clockoutBelum = hadirNormal - clockoutLengkap;

        const selfieLengkap = rows.filter(r =>
            r.is_lembur == 0 &&
            r.foto_masuk &&
            r.foto_keluar
        ).length;

        const selfieBelum = hadirNormal - selfieLengkap;

        const tidakHadir = Math.max(hariKerjaEfektif - hadirNormal, 0);

        const persentase = hariKerjaEfektif > 0
            ? Number(((hadirNormal / hariKerjaEfektif) * 100).toFixed(2))
            : 0;

        const kategori = getKategori(persentase);

        await db.query(`
            INSERT INTO rekap_bulanan
            (
                bulan,
                user_id,
                hari_kerja_efektif,
                hadir,
                tidak_hadir,
                tepat_waktu,
                terlambat,
                clockout_lengkap,
                clockout_belum,
                selfie_lengkap,
                selfie_belum,
                lembur,
                persentase,
                kategori
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                hari_kerja_efektif = VALUES(hari_kerja_efektif),
                hadir = VALUES(hadir),
                tidak_hadir = VALUES(tidak_hadir),
                tepat_waktu = VALUES(tepat_waktu),
                terlambat = VALUES(terlambat),
                clockout_lengkap = VALUES(clockout_lengkap),
                clockout_belum = VALUES(clockout_belum),
                selfie_lengkap = VALUES(selfie_lengkap),
                selfie_belum = VALUES(selfie_belum),
                lembur = VALUES(lembur),
                persentase = VALUES(persentase),
                kategori = VALUES(kategori)
        `, [
            bulan,
            user.id,
            hariKerjaEfektif,
            hadirNormal,
            tidakHadir,
            tepatWaktu,
            terlambat,
            clockoutLengkap,
            clockoutBelum,
            selfieLengkap,
            selfieBelum,
            lembur,
            persentase,
            kategori
        ]);
    }

    return true;
}

async function getRekapBulanan(bulan) {
    const [rows] = await db.query(`
        SELECT
            r.*,
            u.nik,
            u.nama,
            u.jabatan
        FROM rekap_bulanan r
        JOIN users u ON r.user_id = u.id
        WHERE r.bulan = ?
        ORDER BY r.persentase DESC
    `, [bulan]);

    return rows;
}

module.exports = {
    generateRekapBulanan,
    getRekapBulanan
};