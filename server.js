import express, { json } from 'express';
import connection from './modules/connection.js';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
const PORT = 3333;

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

let update_statement = 'UPDATE  `tasks` SET `task`=? ,`status`=? WHERE id = ?';
let insert_statement = 'INSERT INTO `tasks` (task) VALUES (? )';
let delete_statement = 'DELETE FROM `tasks` WHERE id = ?';

app.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM `tasks`', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.post('/tasks', (req, res, next) => {
  const { task } = req.body;
  connection.query(insert_statement, [task], (err, data, field) => {
    switch (err) {
      case err != null:
        console.log(err);
      default:
        res.send('Intsert Completed');
    }
  });
});

app.put('/tasks', (req, res, next) => {
  connection.query(
    update_statement,
    [req.body.task, req.body.status, req.body.id],
    (err, data, field) => {
      switch (data.affectedRows) {
        case data.affectedRows != 0:
          res.send('Update Completed ');
        default:
          res.status(204).send('Update Not Completed ');
          break;
      }
    }
  );
});

app.delete('/tasks', (req, res, next) => {
  const { id } = req.body;
  connection.query(delete_statement, [id], (err, data) => {
    if (err) console.log(err);

    switch (data.affectedRows) {
      case data.affectedRows != 0:
        res.send('Delete compleled ');
      default:
        res.send('Delete not compleled !');
        break;
    }
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
