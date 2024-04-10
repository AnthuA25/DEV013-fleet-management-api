import express, { Application, Request, Response  } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from './docs/swagger';
import taxiRouter from './routes/taxis';
const app: Application = express();
const PORT: number = 3000;

app.use(express.json());


app.use('/taxis', taxiRouter);
app.use("/documentation", swaggerUi.serve,swaggerUi.setup(swaggerSetup))
app.use('/', (req: Request, res: Response): void => {
    res.send('Hello world!');
});

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});