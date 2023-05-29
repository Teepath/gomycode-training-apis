const express = require('express');
const dotEnv = require('dotenv').config();
const connectDB = require('./configuration/config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app= express();
const userRoutes = require('./routes/person');

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res)=>{
    res.send('API is running....')
})

// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, '/frontend/dist')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....');
//   });
// }

// app.use(notFound);
// app.use(errorHandler);




// app.get('/', (req, res)=>{
//     res.send('welcome to our api service!')
// })

const port = process.env.PORT || 4000;


app.listen(port, ()=>{
  console.log(`server now running on port ${port}`)
})