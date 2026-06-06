const router=require('express').Router();
const bcrypt=require('bcrypt');
const db=require('../config/db');

router.get('/',(req,res)=>res.render('login'));
router.post('/login',(req,res)=>{
 db.query('SELECT * FROM users WHERE email=?',[req.body.email],async(e,r)=>{
  if(e||!r.length) return res.render('login',{error:'Login gagal'});
  const ok=await bcrypt.compare(req.body.password,r[0].password);
  if(!ok) return res.render('login',{error:'Login gagal'});
  req.session.user=r[0];
  res.redirect('/dashboard');
 });
});
router.get('/dashboard',(req,res)=>{
 if(!req.session.user) return res.redirect('/');
 res.redirect(req.session.user.role==='admin'?'/admin/dashboard':'/pekerja/dashboard');
});
router.get('/logout',(req,res)=>req.session.destroy(()=>res.redirect('/')));
module.exports=router;
