import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import orderConsumer from "./consumer";

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3001'
};
app.use(cors(corsOptions));


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

orderConsumer()

app.listen(3000);