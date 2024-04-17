const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./controllers/error');
const connectDatabase = require('./connectDatabase');
const tradesRouter = require('./routes/tradesRoute');
const symbolRouter = require('./routes/symbolsRoute');
const authRouter = require('./routes/authRoute');
const app = express();

dotenv.config({
  path: './config/config.env',
});

app.use(
  express.json({
    limit: '50kb',
  })
);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// "imageUrl": "/images/image1.jpg"
// app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/api/v1/trades', tradesRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/symbols', symbolRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8080

connectDatabase();

app.listen(PORT, ()=>{
       console.log(`%cServer starts on port ${PORT}`);
});