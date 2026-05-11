import 'dotenv/config'; 
import connectDB from './src/config/db.js';
import express from 'express';
import stationRouter from './src/routes/stations.js';
// 1. Kết nối Database
connectDB();
import bot from './src/bot.js';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use('/api/stations', stationRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});