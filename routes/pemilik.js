var express = require('express');
var router = express.Router();
const Model_Pemilik = require('../model/model_pemilik');

router.get('/', async function(req, res, next){
    try {
        let rows = await Model_Pemilik.getAll(); // Mengambil semua data Pemilik
        res.render('pemilik/index', { 
            data: rows
        });
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal memuat data Pemilik');
        res.redirect('/pemilik');
    }
});

router.get('/create', function(req, res, next){
    res.render('pemilik/create', { 
        id_pemilik: '',
        nama_kapal: '',
        alamat: '',
        no_hp: ''
    });
});

router.post('/store', async function(req, res, next){
    try {
        let {
            id_pemilik,
            nama_kapal,
            alamat,
            no_hp
        } = req.body;
        
        let Data = { 
            id_pemilik,
            nama_kapal,
            alamat,
            no_hp
        };
        
        await Model_Pemilik.Store(Data);
        req.flash('success', 'Berhasil menyimpan data Pemilik');
        res.redirect('/pemilik');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan data Pemilik');
        res.redirect('/pemilik');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_Pemilik.getById(id);
        res.render('pemilik/edit', { 
            id_pemilik: rows[0].id_pemilik,
            nama_kapal: rows[0].nama_kapal,
            alamat: rows[0].alamat,
            no_hp: rows[0].no_hp
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
            nama_kapal,
            alamat,
            no_hp
        } = req.body;
        
        let Data = {
            nama_kapal,
            alamat,
            no_hp
        };
        
        await Model_Pemilik.Update(id, Data); 
        req.flash('success', 'Berhasil menyimpan perubahan data Pemilik');
        res.redirect('/pemilik');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan perubahan data Pemilik');
        res.redirect('/pemilik');
    }
});

router.get('/delete/:id',async function(req, res, next){
    try {
        let id = req.params.id;
        await Model_Pemilik.Delete(id); 
        req.flash('success', 'Berhasil menghapus data Pemilik');
        res.redirect('/pemilik');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menghapus data Pemilik');
        res.redirect('/pemilik');
    }
});

module.exports = router;
