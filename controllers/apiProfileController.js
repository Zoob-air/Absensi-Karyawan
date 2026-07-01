const bcrypt = require("bcrypt");
const userService = require("../services/userService");

async function getProfile(req, res) {
    try {
        const user = await userService.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan",
            });
        }

        delete user.password;

        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Database error",
        });
    }
}

async function updateProfile(req, res) {
    try {
        const payload = {
            nik: req.body.nik,
            nama: req.body.nama,
            email: req.body.email,
            no_hp: req.body.no_hp,
            jabatan: req.body.jabatan,
            role: req.user.role,
            status: req.user.status || "aktif",
        };

        await userService.updateUser(req.user.id, payload);

        res.json({
            success: true,
            message: "Profile berhasil diupdate",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Gagal update profile",
        });
    }
}

async function changePassword(req, res) {
    try {
        const {
            password_lama,
            password_baru,
            konfirmasi_password,
        } = req.body;

        if (!password_lama || !password_baru || !konfirmasi_password) {
            return res.status(400).json({
                success: false,
                message: "Semua field password wajib diisi",
            });
        }

        if (password_baru !== konfirmasi_password) {
            return res.status(400).json({
                success: false,
                message: "Konfirmasi password tidak sama",
            });
        }

        const user = await userService.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan",
            });
        }

        const cocok = await bcrypt.compare(
            password_lama,
            user.password
        );

        if (!cocok) {
            return res.status(400).json({
                success: false,
                message: "Password lama salah",
            });
        }

        const hash = await bcrypt.hash(password_baru, 10);

        await userService.updatePassword(req.user.id, hash);

        res.json({
            success: true,
            message: "Password berhasil diubah",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Gagal mengubah password",
        });
    }
}

module.exports = {
    getProfile,
    updateProfile,
    changePassword,
};