var express = require('express');
var router = express.Router();
const Model_Alat_Tangkap = require('../model/model_alat_tangkap');

router.get('/', async function(req, res, next){
    try {
        let rows = await Model_Alat_Tangkap.getAll(); // Mengambil semua data alat_tangkap
        res.render('alat_tangkap/index', { 
            data: rows
        });
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal memuat data alat_tangkap');
        res.redirect('/alat_tangkap');
    }
});

router.get('/create', function(req, res, next){
    res.render('alat_tangkap/create', { 
        id_alat_tangkap: '',
        nama_alat_tangkap: ''
    });
});

router.post('/store', async function(req, res, next){
    try {
        let {
            id_alat_tangkap,
            nama_alat_tangkap
        } = req.body;
        
        let Data = { 
            id_alat_tangkap,
            nama_alat_tangkap
        };
        
        await Model_Alat_Tangkap.Store(Data);
        req.flash('success', 'Berhasil menyimpan data alat_tangkap');
        res.redirect('/alat_tangkap');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan data alat_tangkap');
        res.redirect('/alat_tangkap');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_Alat_Tangkap.getById(id);
        res.render('alat_tangkap/edit', { 
            id_alat_tangkap: rows[0].id_alat_tangkap,
            nama_alat_tangkap: rows[0].nama_alat_tangkap
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/update/:id',async function(req, res, next){
    try {
        let id = req.params.id;
        let {
            nama_alat_tangkap
        } = req.body;
        
        let Data = {
            nama_alat_tangkap
        };
        
        await Model_Alat_Tangkap.Update(id, Data); 
        req.flash('success', 'Berhasil menyimpan perubahan data alat_tangkap');
        res.redirect('/alat_tangkap');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan perubahan data alat_tangkap');
        res.redirect('/alat_tangkap');
    }
});

router.get('/delete/:id',async function(req, res, next){
    try {
        let id = req.params.id;
        await Model_Alat_Tangkap.Delete(id); 
        req.flash('success', 'Berhasil menghapus data alat_tangkap');
        res.redirect('/alat_tangkap');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menghapus data alat_tangkap');
        res.redirect('/alat_tangkap');
    }
});

module.exports = router;
