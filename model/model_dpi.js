const connection = require('../config/database');

class Model_DPI {
    // Method untuk mengambil semua data dari tabel DPI.
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM dpi ORDER BY id_dpi DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk menyimpan data ke dalam tabel DPI.
    static async Store(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO dpi SET ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk mengambil data berdasarkan ID dari tabel DPI.
    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM dpi WHERE id_dpi = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk memperbarui data berdasarkan ID dari tabel DPI.
    static async Update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE dpi SET ? WHERE id_dpi = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk menghapus data dari tabel DPI berdasarkan ID.
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM dpi WHERE id_dpi = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_DPI;
