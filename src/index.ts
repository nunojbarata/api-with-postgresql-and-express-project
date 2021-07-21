import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { notFound } from './routes/utils/ui/notfound';
import { productsRoutes } from './routes/handlers/products';

const app: Application = express()
const port = 3000

app.use(bodyParser.json());

app.get('/', (req: express.Request, res:express.Response): void => {
  res.redirect('/api')
});

app.get('/api', (req: express.Request, res:express.Response): void => {
  res.send(`Udacity - Creating an API with Postgresql and express project`)
});

productsRoutes(app)

/* app.get('*', function(req: express.Request, res: express.Response): void {
  res.status(404).send(notFound);
}); */

app.listen(3000, function () {0
    console.log(`starting app on: ${port}`)
});

export default app;
