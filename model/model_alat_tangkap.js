const connection = require('../config/database');

class Model_Alat_Tangkap {

    // Method untuk mengambil semua data dari tabel Alat Tangkap.
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM alat_tangkap ORDER BY id_alat_tangkap ASC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk menyimpan data ke dalam tabel Alat Tangkap.
    static async Store(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO alat_tangkap SET ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk mengambil data berdasarkan ID dari tabel Alat Tangkap.
    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM alat_tangkap WHERE id_alat_tangkap = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk memperbarui data berdasarkan ID dari tabel Alat Tangkap.
    static async Update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE alat_tangkap SET ? WHERE id_alat_tangkap = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk menghapus data dari tabel Alat Tangkap berdasarkan ID.
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM alat_tangkap WHERE id_alat_tangkap = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Alat_Tangkap;
