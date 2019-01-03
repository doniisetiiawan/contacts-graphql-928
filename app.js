import express from 'express';

import apiController from './controllers/api';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiController);

app.listen(3000);
