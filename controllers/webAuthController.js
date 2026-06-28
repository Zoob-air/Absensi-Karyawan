const bcrypt = require('bcrypt');
const userService = require('../services/userService');

function showLogin(req, res) {
    res.render('login');
}

async function login(req, res) {
    try {
        const user = await userService.findByEmail(req.body.email);

        if (!user) {
            return res.render('login', { error: 'Login gagal' });
        }

        if (user.status !== 'aktif') {
            return res.render('login', { error: 'Akun Anda nonaktif' });
        }

        const ok = await bcrypt.compare(req.body.password, user.password);

        if (!ok) {
            return res.render('login', { error: 'Login gagal' });
        }

        req.session.user = user;
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.send('Database Error');
    }
}

function redirectDashboard(req, res) {
    if (!req.session.user) {
        return res.redirect('/');
    }

    res.redirect(req.session.user.role === 'admin' ? '/admin/dashboard' : '/pekerja/dashboard');
}

function showResetPassword(req, res) {
    res.render('reset-password', { user: req.session.user });
}

async function resetPassword(req, res) {
    try {
        const { password_lama, password_baru, konfirmasi_password } = req.body;

        if (password_baru !== konfirmasi_password) {
            return res.render('reset-password', {
                user: req.session.user,
                error: 'Konfirmasi password tidak sama'
            });
        }

        const user = await userService.findById(req.session.user.id);
        const cocok = await bcrypt.compare(password_lama, user.password);

        if (!cocok) {
            return res.render('reset-password', {
                user: req.session.user,
                error: 'Password lama salah'
            });
        }

        const hash = await bcrypt.hash(password_baru, 10);
        await userService.updatePassword(req.session.user.id, hash);

        res.render('reset-password', {
            user: req.session.user,
            success: 'Password berhasil diubah'
        });
    } catch (error) {
        console.log(error);
        res.send('Gagal reset password');
    }
}

function logout(req, res) {
    req.session.destroy(() => res.redirect('/'));
}

module.exports = {
    showLogin,
    login,
    redirectDashboard,
    showResetPassword,
    resetPassword,
    logout
};
