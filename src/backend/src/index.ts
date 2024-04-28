import { startServer } from './server';

const port = 5000;
const corsOptions = { origin: '*' }; 
const limiter = { time: 15 * 60 * 1000, max: 100 }; 

startServer({ port, corsOptions, limiter });