const express = require('express');
const router = express.Router();
const Model_Kapal = require('../model/model_kapal');

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
router.get('/create', function(req, res, next) {
    res.render('kapal/create', { 
        id_kapal: '',
        nama_kapal: '',
        id_dpi: '',
        id_alat_kapal: '',
        id_pemilik: ''
    });
});

// Route untuk menambahkan data kapal
router.post('/store', async function(req, res, next) {
    try {
        let {
            id_kapal,
            nama_kapal,
            id_dpi,
            id_alat_kapal,
            id_pemilik
        } = req.body;
        
        let Data = { 
            id_kapal,
            nama_kapal,
            id_dpi,
            id_alat_kapal,
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

router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let kapal = await Model_Kapal.getById(id);
        res.render('kapal/edit', { 
            id: id, // Menambahkan variabel id ke dalam objek konteks
            nama_kapal: kapal[0].nama_kapal,
            id_dpi: kapal[0].id_dpi,
            id_alat_kapal: kapal[0].id_alat_kapal,
            id_pemilik: kapal[0].id_pemilik
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route untuk menyimpan perubahan pada data kapal berdasarkan ID
router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let {
            nama_kapal,
            id_dpi,
            id_alat_kapal,
            id_pemilik
        } = req.body;
        
        let Data = {
            nama_kapal,
            id_dpi,
            id_alat_kapal,
            id_pemilik
        };
        
        await Model_Kapal.Update(id, Data); 
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
