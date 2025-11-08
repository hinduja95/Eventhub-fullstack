const express = require("express");
const http = require("http");
const cors = require('cors');
const helmet = require("helmet");
require('dotenv').config()
const PORT = process.env.PORT || 8085;
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(helmet({crossOriginResourcePolicy: false}));
app.disable('etag');
app.use(cors());

const  eventDB = require('./config/db')

const eventData=require('./middlewares/sampleData')
const eventEnrollment=require('./middlewares/sampleData')
const studentList=require('./middlewares/sampleData')
// testing api for the server

const router=require('./routes/index');
app.use("/ems/v1",router);

app.get('/ems/2', (req, res) => {
    console.log(`Service is Working...on ${PORT}`)
    return res.send(`Service is  Working...on ${PORT}`);
})

// app.get('/ems/events/list',(req,res) =>{
//     return res.json(studentList);
//  })

// initialized the server
app.listen(PORT,async () => {
  console.log(`Server listening on ${PORT}`);
  try {
  await eventDB.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

}
);