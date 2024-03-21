const connection = require('../config/database');

class Model_Kapal {
    // Method untuk mengambil semua data dari tabel Kapal.
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT a.id_kapal, a.nama_kapal, a.id_pemilik, a.id_dpi, a.id_alat_kapal, ' +
                'b.nama_pemilik, b.id_pemilik, ' +
                'c.nama_dpi, c.id_dpi, ' +
                'd.nama_alat_tangkap, d.id_alat_tangkap ' + 
                'FROM kapal as a ' +
                'INNER JOIN pemilik as b ON a.id_pemilik = b.id_pemilik ' +
                'INNER JOIN dpi as c ON a.id_dpi = c.id_dpi ' +
                'INNER JOIN alat_tangkap as d ON a.id_alat_kapal = d.id_alat_tangkap ' +
                'ORDER BY a.id_kapal DESC', 
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    // Method untuk menyimpan data ke dalam tabel Kapal.
    static async Store(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO Kapal SET ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk mengambil data berdasarkan ID dari tabel Kapal.
    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Kapal WHERE id_kapal = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Method untuk memperbarui data berdasarkan ID dari tabel Kapal.
    static async Update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE Kapal SET ? WHERE id_kapal = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Method untuk menghapus data dari tabel Kapal berdasarkan ID.
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM Kapal WHERE id_kapal = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Kapal;
