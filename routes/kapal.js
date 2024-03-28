const express = require('express');
const router = express.Router();
const Model_Kapal = require('../model/model_kapal');
const Model_DPI = require('../model/model_dpi');
const Model_Pemilik = require('../model/model_pemilik');
const Model_Alat_Tangkap = require('../model/model_alat_tangkap');

// Route untuk menampilkan semua data kapal
router.get('/', async function(req, res, next) {
    try {
        let rows = await Model_Kapal.getAll(); // Mengambil semua data kapal
        res.render('kapal/index', { 
            data: rows
        });
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal memuat data kapal');
        res.redirect('/kapal');
    }
});

// Route untuk menampilkan form tambah kapal
router.get('/create', async function (req, res, next) {
    try {
        let pemilik = await Model_Pemilik.getAll();
        let dpi = await Model_DPI.getAll();
        let alat_tangkap = await Model_Alat_Tangkap.getAll();
        res.render('kapal/create', {
            dataPemilik: pemilik,
            dataDPI: dpi,
            dataAlatTangkap: alat_tangkap
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Terjadi kesalahan pada server');
        res.redirect('/kapal');
    }
});

// Route untuk menambahkan data kapal
router.post('/store', async function(req, res, next) {
    try {
        let {
            nama_kapal,
            id_dpi,
            id_alat_tangkap,
            id_pemilik
        } = req.body;
        
        let Data = { 
            nama_kapal,
            id_dpi,
            id_alat_tangkap,
            id_pemilik
        };
        
        await Model_Kapal.Store(Data);
        req.flash('success', 'Berhasil menyimpan data kapal');
        res.redirect('/kapal');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan data kapal');
        res.redirect('/kapal');
    }
});

// Route untuk menampilkan form edit kapal
router.get('/edit/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let pemilik = await Model_Pemilik.getAll();
        let dpi = await Model_DPI.getAll();
        let alat_tangkap = await Model_Alat_Tangkap.getAll();
        let rows = await Model_Kapal.getById(id);
        res.render('kapal/edit', {
            data: rows[0],
            dataPemilik: pemilik,
            dataDPI: dpi,
            dataAlatTangkap: alat_tangkap
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Terjadi kesalahan pada server');
        res.redirect('/kapal');
    }
});

// Route untuk menyimpan perubahan pada data kapal berdasarkan ID
router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let {
            nama_kapal,
            id_dpi,
            id_alat_tangkap,
            id_pemilik
        } = req.body;
        
        let data = {
            nama_kapal,
            id_dpi,
            id_alat_tangkap,
            id_pemilik
        };
        
        await Model_Kapal.Update(id, data); 
        req.flash('success', 'Berhasil menyimpan perubahan data kapal');
        res.redirect('/kapal');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menyimpan perubahan data kapal');
        res.redirect('/kapal');
    }
});

// Route untuk menghapus data kapal berdasarkan ID
router.get('/delete/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        await Model_Kapal.Delete(id); 
        req.flash('success', 'Berhasil menghapus data kapal');
        res.redirect('/kapal');
    } catch (error) {
        console.error("Error:", error);
        req.flash('error', 'Gagal menghapus data kapal');
        res.redirect('/kapal');
    }
});

module.exports = router;
