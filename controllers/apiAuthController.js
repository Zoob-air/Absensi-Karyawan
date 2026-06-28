const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email dan password wajib diisi'
            });
        }

        const user = await userService.findByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email atau password salah'
            });
        }

        if (user.status !== 'aktif') {
            return res.status(403).json({
                success: false,
                message: 'Akun nonaktif'
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Email atau password salah'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                nama: user.nama,
                email: user.email,
                role: user.role,
                jabatan: user.jabatan
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            success: true,
            message: 'Login berhasil',
            token,
            user: {
                id: user.id,
                nik: user.nik,
                nama: user.nama,
                email: user.email,
                role: user.role,
                jabatan: user.jabatan,
                status: user.status
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
}

function me(req, res) {
    res.json({ success: true, user: req.user });
}

function logout(req, res) {
    res.json({
        success: true,
        message: 'Logout berhasil. Hapus token dari aplikasi client.'
    });
}

module.exports = { login, me, logout };
