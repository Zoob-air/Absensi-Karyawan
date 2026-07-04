const db = require('../config/db').promise();

async function getAllHolidays() {
    const [rows] = await db.query(`
        SELECT *
        FROM hari_libur
        ORDER BY tanggal DESC
    `);

    return rows;
}

async function createHoliday(data) {
    const [result] = await db.query(`
        INSERT INTO hari_libur
        (
            tanggal,
            keterangan,
            tipe
        )
        VALUES
        (?, ?, ?)
    `, [
        data.tanggal,
        data.keterangan,
        data.tipe
    ]);

    return result.insertId;
}

async function updateHoliday(id, data) {
    const [result] = await db.query(`
        UPDATE hari_libur
        SET
            tanggal = ?,
            keterangan = ?,
            tipe = ?
        WHERE id = ?
    `, [
        data.tanggal,
        data.keterangan,
        data.tipe,
        id
    ]);

    return result.affectedRows;
}

async function deleteHoliday(id) {
    const [result] = await db.query(`
        DELETE FROM hari_libur
        WHERE id = ?
    `, [id]);

    return result.affectedRows;
}

async function getHolidayByDate(tanggal) {
    const [rows] = await db.query(`
        SELECT *
        FROM hari_libur
        WHERE tanggal = ?
        LIMIT 1
    `, [tanggal]);

    return rows[0] || null;
}

module.exports = {
    getAllHolidays,
    createHoliday,
    updateHoliday,
    deleteHoliday,
    getHolidayByDate
};