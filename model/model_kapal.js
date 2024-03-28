const connection = require('../config/database');

class Model_Kapal {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT a.id_kapal, a.nama_kapal, a.id_pemilik, a.id_dpi, a.id_alat_tangkap, ' +
                'b.Nama_pemilik, ' +
                'c.Nama_dpi, ' +
                'd.Nama_alat_tangkap ' +
                'FROM Kapal AS a ' +
                'INNER JOIN Pemilik AS b ON a.id_pemilik = b.Id_pemilik ' +
                'INNER JOIN DPI AS c ON a.id_dpi = c.Id_dpi ' +
                'INNER JOIN Alat_tangkap AS d ON a.id_alat_tangkap = d.Id_alat_tangkap ' +
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

    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Kapal WHERE Id_kapal = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE Kapal SET ? WHERE Id_kapal = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM Kapal WHERE Id_kapal = ?', id, (err, result) => {
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
