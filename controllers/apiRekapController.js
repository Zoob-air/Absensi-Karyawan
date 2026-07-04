const rekapService = require('../services/rekapService');

async function generate(req, res) {
    try {
        const { bulan } = req.body;

        if (!bulan) {
            return res.status(400).json({
                success: false,
                message: 'Bulan wajib diisi. Format: YYYY-MM'
            });
        }

        await rekapService.generateRekapBulanan(bulan);

        res.json({
            success: true,
            message: 'Rekap bulanan berhasil digenerate'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Gagal generate rekap bulanan'
        });
    }
}

async function index(req, res) {
    try {
        const { bulan } = req.query;

        if (!bulan) {
            return res.status(400).json({
                success: false,
                message: 'Parameter bulan wajib diisi'
            });
        }

        const rows = await rekapService.getRekapBulanan(bulan);

        res.json({
            success: true,
            bulan,
            total: rows.length,
            data: rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil rekap bulanan'
        });
    }
}

module.exports = {
    generate,
    index
};