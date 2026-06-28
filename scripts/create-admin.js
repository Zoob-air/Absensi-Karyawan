require('dotenv').config();

const bcrypt = require('bcrypt');
const db = require('../config/db').promise();

async function main() {
    const password = await bcrypt.hash('123456', 10);

    await db.query(`
        INSERT INTO users (nik, nama, email, no_hp, jabatan, password, role, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            nama = VALUES(nama),
            password = VALUES(password),
            role = VALUES(role),
            status = VALUES(status)
    `, [
        'ADM001',
        'Administrator',
        'admin@twink.co.id',
        '081234567890',
        'Administrator System',
        password,
        'admin',
        'aktif'
    ]);

    console.log('Admin berhasil dibuat: admin@twink.co.id / 123456');
    process.exit(0);
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
