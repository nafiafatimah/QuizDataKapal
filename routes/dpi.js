var express = require('express');
var router = express.Router();
const Model_DPI = require('../model/model_dpi');

router.get('/', async function(req, res, next){
    try {
        let rows = await Model_DPI.getAll(); // Mengambil semua data DPI
        res.render('dpi/index', { 
            data: rows
        });
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal memuat data DPI');
        res.redirect('/dpi');
    }
});

router.get('/create', function(req, res, next){
    res.render('dpi/create', { 
        id_dpi: '',
        nama_dpi: '',
        luas: ''
    });
});

router.post('/store', async function(req, res, next){
    try {
        let {
            id_dpi,
            nama_dpi,
            luas
        } = req.body;
        
        let Data = { 
            id_dpi,
            nama_dpi,
            luas
        };
        
        await Model_DPI.Store(Data);
        req.flash('success', 'Berhasil menyimpan data DPI');
        res.redirect('/dpi');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan data DPI');
        res.redirect('/dpi');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_DPI.getById(id);
        res.render('dpi/edit', { 
            id_dpi: rows[0].id_dpi,
            nama_dpi: rows[0].nama_dpi,
            luas: rows[0].luas
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
            nama_dpi,
            luas
        } = req.body;
        
        let Data = {
            nama_dpi,
            luas
        };
        
        await Model_DPI.Update(id, Data); 
        req.flash('success', 'Berhasil menyimpan perubahan data DPI');
        res.redirect('/dpi');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan perubahan data DPI');
        res.redirect('/dpi');
    }
});

router.get('/delete/:id',async function(req, res, next){
    try {
        let id = req.params.id;
        await Model_DPI.Delete(id); 
        req.flash('success', 'Berhasil menghapus data DPI');
        res.redirect('/dpi');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menghapus data DPI');
        res.redirect('/dpi');
    }
});

module.exports = router;
