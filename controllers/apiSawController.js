const sawService = require('../services/sawService');

async function generate(req, res) {
    try {
        const { bulan } = req.body;

        if (!bulan) {
            return res.status(400).json({
                success: false,
                message: 'Bulan wajib diisi. Format: YYYY-MM'
            });
        }

        const total = await sawService.generateSAW(bulan);

        res.json({
            success: true,
            message: `SAW berhasil digenerate untuk ${total} pekerja`
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message || 'Gagal generate SAW'
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

        const data = await sawService.getSAW(bulan);

        res.json({
            success: true,
            bulan,
            total: data.length,
            data
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data SAW'
        });
    }
}

async function detail(req,res){

    const data = await sawService.getDetail(req.params.id);

    if(!data){
        return res.status(404).json({
            success:false,
            message:"Data tidak ditemukan"
        });
    }

    res.json({
        success:true,
        data
    });

}

module.exports = {
    generate,
    index,
    detail
};