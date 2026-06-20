const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const moment = require("moment");
const { getAddress } = require("../routes/geocode");

/*
|--------------------------------------------------------------------------
| DASHBOARD ADMIN
|--------------------------------------------------------------------------
*/

router.get(
    '/admin/dashboard',
    auth,
    admin,
    (req, res) => {

        const sqlAbsensi = `
        SELECT
            a.*,
            u.nama,
            u.jabatan
        FROM absensi a
        JOIN users u
            ON a.user_id = u.id
        WHERE a.tanggal = CURDATE()
        ORDER BY a.jam_masuk DESC
        `;

        const sqlTotalPekerja = `
        SELECT COUNT(*) AS total
        FROM users
        WHERE role='pekerja'
        `;

        const sqlHadir = `
        SELECT COUNT(DISTINCT user_id) AS hadir
        FROM absensi
        WHERE tanggal = CURDATE()
        `;

        db.query(sqlAbsensi, async (err, absensi) => {

           if (err) {
            console.log(err);
            return res.send("Database Error");
            }

            for (let item of absensi) {

                item.tanggal =
                    moment(item.tanggal)
                    .format("DD-MM-YYYY");

                if(item.latitude_masuk && item.longitude_masuk){

                    item.lokasi_masuk =
                        await getAddress(
                            item.latitude_masuk,
                            item.longitude_masuk
                        );

                }else{

                    item.lokasi_masuk = "-";
                }

                if(item.latitude_keluar && item.longitude_keluar){

                    item.lokasi_keluar =
                        await getAddress(
                            item.latitude_keluar,
                            item.longitude_keluar
                        );

                }else{

                    item.lokasi_keluar = "-";
                }
            }

            db.query(sqlTotalPekerja, (err, totalResult) => {

                if (err) {
                    console.log(err);
                    return res.send('Database Error');
                }

                db.query(sqlHadir, (err, hadirResult) => {

                    if (err) {
                        console.log(err);
                        return res.send('Database Error');
                    }

                    const totalPekerja =
                        totalResult[0].total;

                    const hadir =
                        hadirResult[0].hadir;

                    const belumHadir =
                        totalPekerja - hadir;

                    const persentase =
                        totalPekerja > 0
                            ? ((hadir / totalPekerja) * 100).toFixed(1)
                            : 0;

                    res.render(
                        'admin/dashboard',
                        {
                            user: req.session.user,
                            absensi,

                            totalPekerja,
                            hadir,
                            belumHadir,
                            persentase
                        }
                        
                    );

                });

            });

        });

    }
);

/*
|--------------------------------------------------------------------------
| DATA PEKERJA
|--------------------------------------------------------------------------
*/

router.get(
    '/admin/users',
    auth,
    admin,
    (req, res) => {

        db.query(
            'SELECT * FROM users ORDER BY id DESC',
            (err, rows) => {

                if (err) {
                    console.log(err);
                    return res.send('Database Error');
                }

                res.render(
                    'admin/users',
                    {
                        users: rows
                    }
                );

            }
        );

    }
);

/*
|--------------------------------------------------------------------------
| FORM TAMBAH PEKERJA
|--------------------------------------------------------------------------
*/

router.get(
    '/admin/users/add',
    auth,
    admin,
    (req, res) => {

        res.render('admin/add-user');

    }
);

/*
|--------------------------------------------------------------------------
| SIMPAN PEKERJA
|--------------------------------------------------------------------------
*/

router.post(
    '/admin/users/add',
    auth,
    admin,
    async (req, res) => {

        try {

            const hash =
                await bcrypt.hash(
                    req.body.password,
                    10
                );

            db.query(
                `
                INSERT INTO users
                (
                    nik,
                    nama,
                    email,
                    no_hp,
                    jabatan,
                    password,
                    role
                )
                VALUES
                (
                    ?,?,?,?,?,?,
                    'pekerja'
                )
                `,
                [
                    req.body.nik,
                    req.body.nama,
                    req.body.email,
                    req.body.no_hp,
                    req.body.jabatan,
                    hash
                ],
                (err) => {

                    if (err) {
                        console.log(err);
                        return res.send('Gagal Menyimpan User');
                    }

                    res.redirect(
                        '/admin/users'
                    );

                }
            );

        } catch (error) {

            console.log(error);
            res.send('Terjadi Kesalahan');

        }

    }
);
/*
|--------------------------------------------------------------------------
| RIWAYAT ABSENSI SEMUA PEKERJA
|--------------------------------------------------------------------------
*/

router.get(
    '/admin/riwayat',
    auth,
    admin,
    async (req,res)=>{

        let sql = `
        SELECT
            a.*,
            u.nama,
            u.nik,
            u.jabatan
        FROM absensi a
        JOIN users u
            ON a.user_id = u.id
        WHERE 1=1
        `;

        let params = [];

        if(req.query.bulan){

            sql += `
            AND DATE_FORMAT(a.tanggal,'%Y-%m') = ?
            `;

            params.push(req.query.bulan);
        }

        sql += `
        ORDER BY a.tanggal DESC
        `;

        db.query(
            sql,
            params,
            async (err,rows)=>{

                if(err){
                    console.log(err);
                    return res.send("Database Error");
                }

                for(let item of rows){

                    // format tanggal
                    const d = new Date(item.tanggal);

                    item.tanggal =
                        d.toLocaleDateString('id-ID');

                    // lokasi masuk
                    if(
                        item.latitude_masuk &&
                        item.longitude_masuk
                    ){

                        item.lokasi_masuk =
                        await getAddress(
                            item.latitude_masuk,
                            item.longitude_masuk
                        );

                    }else{

                        item.lokasi_masuk = "-";
                    }

                    // lokasi keluar
                    if(
                        item.latitude_keluar &&
                        item.longitude_keluar
                    ){

                        item.lokasi_keluar =
                        await getAddress(
                            item.latitude_keluar,
                            item.longitude_keluar
                        );

                    }else{

                        item.lokasi_keluar = "-";
                    }
                }

                res.render(
                    'admin/riwayat',
                    {
                        user:req.session.user,
                        data:rows,
                        bulan:req.query.bulan
                    }
                );

            }
        );

    }
);
/*
|--------------------------------------------------------------------------
| HAPUS PEKERJA
|--------------------------------------------------------------------------
*/

router.get(
    '/admin/users/delete/:id',
    auth,
    admin,
    (req,res)=>{

        const userId =
        req.params.id;

        db.query(
            `
            DELETE FROM users
            WHERE id = ?
            `,
            [userId],
            (err)=>{

                if(err){
                    console.log(err);
                    return res.send(
                        'Gagal menghapus pekerja'
                    );
                }

                res.redirect(
                    '/admin/users'
                );

            }
        );

    }
);

module.exports = router;