import express from 'express';
import { getStationsWorks } from '../controller/station.js';
const router = express.Router();

router.get('/', getStationsWorks);


export default router;