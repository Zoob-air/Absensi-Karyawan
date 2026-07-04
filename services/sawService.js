const db = require('../config/db').promise();

const BOBOT = {
    c1: 0.40,
    c2: 0.30,
    c3: 0.15,
    c4: 0.15
};

function getKategori(skor) {
    if (skor >= 90) return 'Sangat Disiplin';
    if (skor >= 75) return 'Disiplin';
    if (skor >= 60) return 'Cukup';
    return 'Perlu Pembinaan';
}

async function generateSAW(bulan) {
    const [rekap] = await db.query(`
        SELECT *
        FROM rekap_bulanan
        WHERE bulan = ?
    `, [bulan]);

    if (rekap.length === 0) {
        throw new Error('Data rekap bulanan belum tersedia. Generate rekap dulu.');
    }

    const hasil = rekap.map(item => {
        const efektif = Number(item.hari_kerja_efektif) || 0;

        const c1 = efektif > 0 ? (Number(item.hadir) / efektif) * 100 : 0;
        const c2 = efektif > 0 ? (Number(item.tepat_waktu) / efektif) * 100 : 0;
        const c3 = efektif > 0 ? (Number(item.clockout_lengkap) / efektif) * 100 : 0;
        const c4 = efektif > 0 ? (Number(item.selfie_lengkap) / efektif) * 100 : 0;

        const skor =
            (c1 * BOBOT.c1) +
            (c2 * BOBOT.c2) +
            (c3 * BOBOT.c3) +
            (c4 * BOBOT.c4);

        return {
            user_id: item.user_id,
            c1: Number(c1.toFixed(2)),
            c2: Number(c2.toFixed(2)),
            c3: Number(c3.toFixed(2)),
            c4: Number(c4.toFixed(2)),
            skor: Number(skor.toFixed(2)),
            kategori: getKategori(skor)
        };
    });

    hasil.sort((a, b) => b.skor - a.skor);

    for (let i = 0; i < hasil.length; i++) {
        const row = hasil[i];

        await db.query(`
            INSERT INTO saw_bulanan
            (
                bulan,
                user_id,
                c1_kehadiran,
                c2_tepat_waktu,
                c3_clockout,
                c4_selfie,
                skor_akhir,
                ranking,
                kategori
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                c1_kehadiran = VALUES(c1_kehadiran),
                c2_tepat_waktu = VALUES(c2_tepat_waktu),
                c3_clockout = VALUES(c3_clockout),
                c4_selfie = VALUES(c4_selfie),
                skor_akhir = VALUES(skor_akhir),
                ranking = VALUES(ranking),
                kategori = VALUES(kategori)
        `, [
            bulan,
            row.user_id,
            row.c1,
            row.c2,
            row.c3,
            row.c4,
            row.skor,
            i + 1,
            row.kategori
        ]);
    }

    return hasil.length;
}

async function getSAW(bulan) {
    const [rows] = await db.query(`
        SELECT
            s.id,
            s.bulan,
            s.user_id,

            u.nik,
            u.nama,
            u.jabatan,

            r.hari_kerja_efektif,
            r.hadir,
            r.tidak_hadir,
            r.tepat_waktu,
            r.terlambat,
            r.clockout_lengkap,
            r.clockout_belum,
            r.selfie_lengkap,
            r.selfie_belum,
            r.lembur,

            s.c1_kehadiran,
            s.c2_tepat_waktu,
            s.c3_clockout,
            s.c4_selfie,
            s.skor_akhir,
            s.ranking,
            s.kategori
        FROM saw_bulanan s
        JOIN rekap_bulanan r
            ON s.user_id = r.user_id
           AND s.bulan = r.bulan
        JOIN users u
            ON s.user_id = u.id
        WHERE s.bulan = ?
        ORDER BY s.ranking ASC
    `, [bulan]);

    return rows;
}

async function getDetail(id) {
    const [rows] = await db.query(`
        SELECT
            s.*,

            u.nik,
            u.nama,
            u.jabatan,

            r.hari_kerja_efektif,
            r.hadir,
            r.tidak_hadir,
            r.tepat_waktu,
            r.terlambat,
            r.clockout_lengkap,
            r.clockout_belum,
            r.selfie_lengkap,
            r.selfie_belum,
            r.lembur

        FROM saw_bulanan s

        JOIN users u
            ON s.user_id=u.id

        JOIN rekap_bulanan r
            ON r.user_id=s.user_id
           AND r.bulan=s.bulan

        WHERE s.id=?
    `,[id]);

    return rows[0];
}

module.exports = {
    generateSAW,
    getSAW,
    getDetail
};