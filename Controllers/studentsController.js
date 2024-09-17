const db = require('../database/connection.js');

class StudentsController {

  query(req, res) {
    try {
      db.query(`SELECT * FROM students`,
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
          }
          res.status(200).json(rows);
        });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  queryDetail(req, res) {
    const { id } = req.params;
    try {
      db.query(`SELECT * FROM students WHERE id = ?`, [id],
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
          }
          res.status(200).json(rows[0]);
        });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  insert(req, res) {
    try {
      const { dni, name, lastname, email, phone } = req.body;
      db.query(`INSERT INTO students (id, dni, name, lastname, email, phone)
                VALUES(NULL, ?, ?, ?, ?, ?);`,
        [dni, name, lastname, email, phone], (err, rows) => {
          if (err) {
            res.status(400).send(err);
          }
          if (rows.insertId) {
            res.status(201).json({ id: rows.insertId });
          }
        });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  update(req, res) {
    const { id } = req.params;
    try {
      const { dni, name, lastname, email, phone } = req.body;
      db.query(`UPDATE students
                SET dni = ?, name = ?, lastname = ?, email = ?, phone = ?
                WHERE id = ?;`,
        [dni, name, lastname, email, phone, id], (err, rows) => {
          if (err) {
            res.status(400).send(err);
          }
          if (rows.affectedRows === 1) {
            res.status(200).json({ response: 'Record updated successfully' });
          }
        });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  delete(req, res) {
    const { id } = req.params;
    try {
      db.query(`DELETE FROM students WHERE id = ?;`,
        [id], (err, rows) => {
          if (err) {
            res.status(400).send(err);
          }
          if (rows.affectedRows === 1) {
            res.status(200).json({ response: 'Record deleted successfully' });
          }
        });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

}

module.exports = new StudentsController();
