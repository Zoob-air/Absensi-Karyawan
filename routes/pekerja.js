const router = require("express").Router();
const auth = require("../middleware/auth");
const db = require("../config/db");
const moment = require("moment");
const { getAddress } = require("../routes/geocode.js");
/*
|--------------------------------------------------------------------------
| DASHBOARD PEKERJA
|--------------------------------------------------------------------------
*/

router.get(
    '/pekerja/dashboard',
    auth,
    (req,res)=>{

        db.query(
            `
            SELECT *
            FROM absensi
            WHERE user_id = ?
            AND tanggal = CURDATE()
            `,
            [req.session.user.id],
            (err,rows)=>{

                if(err){
                    console.log(err);
                    return res.send("Database Error");
                }

                let status = "Belum Absen";
                let jamMasuk = "-";
                let jamKeluar = "-";

                if(rows.length > 0){

                    jamMasuk = rows[0].jam_masuk || "-";
                    jamKeluar = rows[0].jam_keluar || "-";

                    if(rows[0].jam_masuk && !rows[0].jam_keluar){
                        status = "Sudah Clock In";
                    }

                    if(rows[0].jam_masuk && rows[0].jam_keluar){
                        status = "Sudah Clock Out";
                    }
                }

                res.render(
                    'pekerja/dashboard',
                    {
                        user:req.session.user,
                        status,
                        jamMasuk,
                        jamKeluar
                    }
                );

            }
        );

    }
);

/*
|--------------------------------------------------------------------------
| HALAMAN ABSENSI
|--------------------------------------------------------------------------
*/

router.get(
    "/pekerja/absensi",
    auth,
    (req, res) => {

        res.render(
            "pekerja/absensi",
            {
                user: req.session.user
            }
        );

    }
);

/*
|--------------------------------------------------------------------------
| CLOCK IN
|--------------------------------------------------------------------------
*/

router.post(
    "/pekerja/clockin",
    auth,
    (req, res) => {

        db.query(
            `
            SELECT *
            FROM absensi
            WHERE user_id = ?
            AND tanggal = CURDATE()
            `,
            [req.session.user.id],
            (err, result) => {

                if (err) {
                    console.log(err);
                    return res.send("Database Error");
                }

                if (result.length > 0) {

                    return res.send(
                        `
                        <h3>
                        Anda sudah melakukan Clock In hari ini.
                        </h3>

                        <a href="/pekerja/dashboard">
                        Kembali ke Dashboard
                        </a>
                        `
                    );

                }

                db.query(
                    `
                    INSERT INTO absensi
                    (
                        user_id,
                        tanggal,
                        jam_masuk,
                        latitude_masuk,
                        longitude_masuk,
                        keterangan_masuk
                    )
                    VALUES
                    (
                        ?,
                        CURDATE(),
                        CURTIME(),
                        ?,
                        ?,
                        ?
                    )
                    `,
                    [
                        req.session.user.id,
                        req.body.latitude,
                        req.body.longitude,
                        req.body.keterangan
                    ],
                    (err) => {

                        if (err) {
                            console.log(err);
                            return res.send("Gagal Clock In");
                        }

                        res.redirect(
                            "/pekerja/dashboard"
                        );

                    }
                );

            }
        );

    }
);

/*
|--------------------------------------------------------------------------
| CLOCK OUT
|--------------------------------------------------------------------------
*/

router.post(
    "/pekerja/clockout",
    auth,
    (req, res) => {

        db.query(
            `
            SELECT *
            FROM absensi
            WHERE user_id = ?
            AND tanggal = CURDATE()
            `,
            [req.session.user.id],
            (err, result) => {

                if (err) {
                    console.log(err);
                    return res.send("Database Error");
                }

                if (result.length === 0) {

                    return res.send(
                        `
                        <h3>
                        Anda belum melakukan Clock In hari ini.
                        </h3>

                        <a href="/pekerja/dashboard">
                        Kembali ke Dashboard
                        </a>
                        `
                    );

                }

                if (result[0].jam_keluar) {

                    return res.send(
                        `
                        <h3>
                        Anda sudah melakukan Clock Out hari ini.
                        </h3>

                        <a href="/pekerja/dashboard">
                        Kembali ke Dashboard
                        </a>
                        `
                    );

                }

                const absensiId = result[0].id;

                db.query(
                    `
                    UPDATE absensi
                    SET
                        jam_keluar = CURTIME(),
                        latitude_keluar = ?,
                        longitude_keluar = ?,
                        keterangan_keluar = ?
                    WHERE id = ?
                    `,
                    [
                        req.body.latitude,
                        req.body.longitude,
                        req.body.keterangan,
                        absensiId
                    ],
                    (err) => {

                        if (err) {
                            console.log(err);
                            return res.send("Gagal Clock Out");
                        }

                        res.redirect(
                            "/pekerja/dashboard"
                        );

                    }
                );

            }
        );

    }
);

/*
|--------------------------------------------------------------------------
| RIWAYAT ABSENSI
|--------------------------------------------------------------------------
*/

router.get(
    "/pekerja/riwayat",
    auth,
    (req,res)=>{

        let sql = `
        SELECT *
        FROM absensi
        WHERE user_id = ?
        `;

        let params = [
            req.session.user.id
        ];

        if(req.query.bulan){

            sql += `
            AND DATE_FORMAT(tanggal,'%Y-%m') = ?
            `;

            params.push(
                req.query.bulan
            );
        }

        sql += `
        ORDER BY tanggal DESC
        `;

        db.query(sql, params, async (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        // format tanggal + ubah koordinat jadi alamat
        for (let item of result) {

            item.tanggal = moment(item.tanggal).format("DD-MM-YYYY");

            // lokasi masuk
            if (item.latitude_masuk && item.longitude_masuk) {
                item.lokasi_masuk = await getAddress(
                    item.latitude_masuk,
                    item.longitude_masuk
                );
            } else {
                item.lokasi_masuk = "-";
            }

            // lokasi keluar
            if (item.latitude_keluar && item.longitude_keluar) {
                item.lokasi_keluar = await getAddress(
                    item.latitude_keluar,
                    item.longitude_keluar
                );
            } else {
                item.lokasi_keluar = "-";
            }
        }

        res.render("pekerja/riwayat", {
            user: req.session.user,
            data: result,
            bulan: req.query.bulan
        });
    });
});

module.exports = router;