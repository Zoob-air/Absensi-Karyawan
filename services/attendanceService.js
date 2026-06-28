const db = require('../config/db').promise();

async function getTodayByUser(userId) {
    const [rows] = await db.query(`
        SELECT *
        FROM absensi
        WHERE user_id = ?
        AND tanggal = CURDATE()
    `, [userId]);

    return rows[0] || null;
}

async function clockIn(userId, data) {
    const [result] = await db.query(`
        INSERT INTO absensi
        (user_id, tanggal, jam_masuk, latitude_masuk, longitude_masuk, keterangan_masuk)
        VALUES (?, CURDATE(), CURTIME(), ?, ?, ?)
    `, [
        userId,
        data.latitude,
        data.longitude,
        data.keterangan
    ]);

    return result.insertId;
}

async function clockOut(absensiId, data) {
    const [result] = await db.query(`
        UPDATE absensi
        SET jam_keluar = CURTIME(),
            latitude_keluar = ?,
            longitude_keluar = ?,
            keterangan_keluar = ?
        WHERE id = ?
    `, [
        data.latitude,
        data.longitude,
        data.keterangan || '',
        absensiId
    ]);

    return result.affectedRows;
}

async function getRiwayatByUser(userId, bulan) {
    let sql = `SELECT * FROM absensi WHERE user_id = ?`;
    const params = [userId];

    if (bulan) {
        sql += ` AND DATE_FORMAT(tanggal,'%Y-%m') = ?`;
        params.push(bulan);
    }

    sql += ` ORDER BY tanggal DESC`;

    const [rows] = await db.query(sql, params);
    return rows;
}

async function getAdminRiwayat(filter = {}) {
    let sql = `
        SELECT a.*, u.nik, u.nama, u.jabatan
        FROM absensi a
        JOIN users u ON a.user_id = u.id
        WHERE 1=1
    `;

    const params = [];

    if (filter.bulan) {
        sql += ` AND DATE_FORMAT(a.tanggal,'%Y-%m') = ?`;
        params.push(filter.bulan);
    }

    if (filter.nama) {
        sql += ` AND u.nama LIKE ?`;
        params.push(`%${filter.nama}%`);
    }

    if (filter.jabatan) {
        sql += ` AND u.jabatan LIKE ?`;
        params.push(`%${filter.jabatan}%`);
    }

    sql += ` ORDER BY a.tanggal DESC`;

    const [rows] = await db.query(sql, params);
    return rows;
}

async function getTodayAdminAbsensi() {
    const [rows] = await db.query(`
        SELECT a.*, u.nama, u.jabatan
        FROM absensi a
        JOIN users u ON a.user_id = u.id
        WHERE a.tanggal = CURDATE()
        ORDER BY a.jam_masuk DESC
    `);

    return rows;
}

async function getAdminStats() {
    const [rows] = await db.query(`
        SELECT
            (SELECT COUNT(*) FROM users WHERE role='pekerja') AS totalPekerja,
            (SELECT COUNT(DISTINCT user_id) FROM absensi WHERE tanggal = CURDATE()) AS hadir,
            (SELECT COUNT(*) FROM absensi WHERE tanggal = CURDATE() AND jam_keluar IS NOT NULL) AS sudahClockOut
    `);

    const totalPekerja = rows[0].totalPekerja;
    const hadir = rows[0].hadir;
    const sudahClockOut = rows[0].sudahClockOut;

    return {
        totalPekerja,
        hadir,
        belumHadir: totalPekerja - hadir,
        sudahClockOut,
        belumClockOut: hadir - sudahClockOut,
        persentase: totalPekerja > 0 ? ((hadir / totalPekerja) * 100).toFixed(1) : 0
    };
}

module.exports = {
    getTodayByUser,
    clockIn,
    clockOut,
    getRiwayatByUser,
    getAdminRiwayat,
    getTodayAdminAbsensi,
    getAdminStats
};
