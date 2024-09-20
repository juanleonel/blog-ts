import express, { Request, Response } from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as routes from './routes/index';
import { connect } from './database/connection';
import bookRoutes from './routes/book.routes';
import createHttpError from 'http-errors';

connect();

const portNumber = 8080;
const app = express();
app.set('port', portNumber);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/book', bookRoutes);
app.get('/', routes.index);
// app.get('/book', routes.list);
// app.post('/book', routes.submit);
// app.get('/create', routes.create);

app.use(express.static('.'));

app.use((err: any, req: Request, res: Response, next: any) => {
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  const code = err.status || 500; 

  return res.status(code).render('error')
})

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
