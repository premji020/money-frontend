const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://db-hk2:db54321@cluster0.ncyo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const transactionsRouter = require('./routes/transactions');
const usersRouter = require('./routes/users');

app.use('/transactions', transactionsRouter);
app.use('/users', usersRouter);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});