import express from 'express';
import dotenv from 'dotenv';
import { NumberStore } from './models/NumberStore';
import { NumberService } from './services/NumberService';
import { NumberController } from './controllers/NumberController';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || '';
const WINDOW_SIZE = parseInt(process.env.WINDOW_SIZE || '10');

const numberStore = new NumberStore(WINDOW_SIZE);
const numberService = new NumberService(BASE_URL);
const numberController = new NumberController(numberStore, numberService);

app.get('/numbers/:id', (req, res) => numberController.getNumbers(req, res));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});