import "reflect-metadata"
import express from 'express';
import { router } from './routes';
import cors from 'cors';

const corsOptions = {
    origin:'http://localhost:5173', 
    credentials: true,            
    optionSuccessStatus:200
}
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);


app.listen(3001, () => console.log('Server on port: 3001'));

