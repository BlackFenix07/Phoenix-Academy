const db = require('../database/connection.js');

class CoursesController {

  query(req, res) {
    try {
      db.query(`SELECT * FROM courses`,
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
      db.query(`SELECT * FROM courses WHERE id = ?`, [id],
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
      const { teacher_id, name, description } = req.body;
      db.query(`INSERT INTO courses (id, teacher_id, name, description)
                VALUES(NULL, ?, ?, ?);`,
        [teacher_id, name, description], (err, rows) => {
          if (err) {
            res.status(400).send(err.message);
          } else {
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
      const { teacher_id, name, description } = req.body;
      db.query(`UPDATE courses
                SET teacher_id = ?, name = ?, description = ?
                WHERE id = ?;`,
        [teacher_id, name, description, id], (err, rows) => {
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
      db.query(`DELETE FROM courses WHERE id = ?;`,
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

  associateStudent(req, res) {
    try {
      const { course_id, student_id } = req.body;
      db.query(`INSERT INTO students_courses (course_id, student_id)
                VALUES(?, ?);`,
        [course_id, student_id], (err, rows) => {
          if (err) {
            res.status(400).send(err.message);
          } else {
            res.status(201).json({ response: 'Student successfully registered' });
          }
        });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

}

module.exports = new CoursesController();
