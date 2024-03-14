const connection = require('../config/database');

class Model_Pemilik {
    // Method untuk mengambil semua data dari tabel Pemilik.
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pemilik ORDER BY id_pemilik DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk menyimpan data ke dalam tabel Pemilik.
    static async Store(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO pemilik SET ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk mengambil data berdasarkan ID dari tabel Pemilik.
    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pemilik WHERE id_pemilik = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk memperbarui data berdasarkan ID dari tabel Pemilik.
    static async Update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE pemilik SET ? WHERE id_pemilik = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk menghapus data dari tabel Pemilik berdasarkan ID.
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM pemilik WHERE id_pemilik = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Pemilik;
