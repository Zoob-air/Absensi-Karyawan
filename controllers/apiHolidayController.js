const moment = require('moment');
const holidayService = require('../services/holidayService');

async function index(req, res) {
    try {
        const rows = await holidayService.getAllHolidays();

        const data = rows.map(row => ({
            id: row.id,
            tanggal: moment(row.tanggal).format('YYYY-MM-DD'),
            keterangan: row.keterangan,
            tipe: row.tipe,
            created_at: row.created_at
        }));

        res.json({
            success: true,
            total: data.length,
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data hari libur'
        });
    }
}

async function store(req, res) {
    try {
        const { tanggal, keterangan, tipe } = req.body;

        if (!tanggal || !keterangan || !tipe) {
            return res.status(400).json({
                success: false,
                message: 'Tanggal, keterangan, dan tipe wajib diisi'
            });
        }

        if (!['tanggal_merah', 'cuti_bersama'].includes(tipe)) {
            return res.status(400).json({
                success: false,
                message: 'Tipe harus tanggal_merah atau cuti_bersama'
            });
        }

        await holidayService.createHoliday({
            tanggal,
            keterangan,
            tipe
        });

        res.json({
            success: true,
            message: 'Hari libur berhasil ditambahkan'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Gagal menambahkan hari libur'
        });
    }
}

async function update(req, res) {
    try {
        const { tanggal, keterangan, tipe } = req.body;

        if (!tanggal || !keterangan || !tipe) {
            return res.status(400).json({
                success: false,
                message: 'Tanggal, keterangan, dan tipe wajib diisi'
            });
        }

        if (!['tanggal_merah', 'cuti_bersama'].includes(tipe)) {
            return res.status(400).json({
                success: false,
                message: 'Tipe harus tanggal_merah atau cuti_bersama'
            });
        }

        const affectedRows = await holidayService.updateHoliday(
            req.params.id,
            {
                tanggal,
                keterangan,
                tipe
            }
        );

        if (!affectedRows) {
            return res.status(404).json({
                success: false,
                message: 'Data hari libur tidak ditemukan'
            });
        }

        res.json({
            success: true,
            message: 'Hari libur berhasil diupdate'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Gagal update hari libur'
        });
    }
}

async function destroy(req, res) {
    try {
        const affectedRows = await holidayService.deleteHoliday(req.params.id);

        if (!affectedRows) {
            return res.status(404).json({
                success: false,
                message: 'Data hari libur tidak ditemukan'
            });
        }

        res.json({
            success: true,
            message: 'Hari libur berhasil dihapus'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus hari libur'
        });
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
};