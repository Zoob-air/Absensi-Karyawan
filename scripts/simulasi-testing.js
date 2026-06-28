require("dotenv").config();

const db = require("../config/db");

function randomTime(startHour, endHour) {
    const hour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
}

const lokasiTwink = {
    latitude: "-6.402500",
    longitude: "106.794200"
};

db.query(
    `
    SELECT id, nama
    FROM users
    WHERE role = 'pekerja'
    AND status = 'aktif'
    `,
    (err, users) => {

        if (err) {
            console.log(err);
            process.exit(1);
        }

        if (!users.length) {
            console.log("Tidak ada user pekerja aktif.");
            process.exit(0);
        }

        let selesai = 0;

        users.forEach((user) => {

            const jamMasuk = randomTime(7, 9);
            const jamKeluar = randomTime(16, 18);

            db.query(
                `
                INSERT INTO absensi
                (
                    user_id,
                    tanggal,
                    jam_masuk,
                    jam_keluar,
                    latitude_masuk,
                    longitude_masuk,
                    latitude_keluar,
                    longitude_keluar,
                    keterangan_masuk,
                    keterangan_keluar
                )
                VALUES
                (
                    ?,
                    CURDATE(),
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
                ON DUPLICATE KEY UPDATE
                    jam_masuk = VALUES(jam_masuk),
                    jam_keluar = VALUES(jam_keluar),
                    latitude_masuk = VALUES(latitude_masuk),
                    longitude_masuk = VALUES(longitude_masuk),
                    latitude_keluar = VALUES(latitude_keluar),
                    longitude_keluar = VALUES(longitude_keluar),
                    keterangan_masuk = VALUES(keterangan_masuk),
                    keterangan_keluar = VALUES(keterangan_keluar)
                `,
                [
                    user.id,
                    jamMasuk,
                    jamKeluar,
                    lokasiTwink.latitude,
                    lokasiTwink.longitude,
                    lokasiTwink.latitude,
                    lokasiTwink.longitude,
                    "Simulasi Clock In",
                    "Simulasi Clock Out"
                ],
                (err) => {

                    selesai++;

                    if (err) {
                        console.log(`Gagal insert ${user.nama}:`, err.message);
                    } else {
                        console.log(`OK: ${user.nama} | ${jamMasuk} - ${jamKeluar}`);
                    }

                    if (selesai === users.length) {
                        console.log("Simulasi absensi selesai.");
                        process.exit(0);
                    }
                }
            );

        });
    }
);