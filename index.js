const express = require('express');
const cors = require('cors');
const app = express();
const StudentsRoutes = require('./Routes/studentsRoutes.js');
const TeachersRoutes = require('./Routes/teachersRoutes.js');
const CoursesRoutes = require('./Routes/coursesRoutes.js');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use('/students', StudentsRoutes);
app.use('/teachers', TeachersRoutes);
app.use('/courses', CoursesRoutes);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
