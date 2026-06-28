const db = require('../config/db').promise();

async function findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
}

async function findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
}

async function getAllUsers() {
    const [rows] = await db.query(`
        SELECT id, nik, nama, email, no_hp, jabatan, role, status, created_at
        FROM users
        ORDER BY id DESC
    `);
    return rows;
}

async function createUser(data) {
    const [result] = await db.query(`
        INSERT INTO users (nik, nama, email, no_hp, jabatan, password, role, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        data.nik || null,
        data.nama,
        data.email,
        data.no_hp || null,
        data.jabatan || null,
        data.password,
        data.role || 'pekerja',
        data.status || 'aktif'
    ]);

    return result.insertId;
}

async function updateUser(id, data) {
    const [result] = await db.query(`
        UPDATE users
        SET nik = ?, nama = ?, email = ?, no_hp = ?, jabatan = ?, role = ?, status = ?
        WHERE id = ?
    `, [
        data.nik,
        data.nama,
        data.email,
        data.no_hp,
        data.jabatan,
        data.role,
        data.status,
        id
    ]);

    return result.affectedRows;
}

async function deleteUser(id) {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows;
}

async function updatePassword(id, hashedPassword) {
    const [result] = await db.query(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, id]
    );
    return result.affectedRows;
}

async function countPekerja() {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM users WHERE role = 'pekerja'");
    return rows[0].total;
}

module.exports = {
    findByEmail,
    findById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    updatePassword,
    countPekerja
};
