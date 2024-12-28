import express, { Request, Response } from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as routes from './routes/index';
import { connect } from './database/connection';
import bookRoutes from './routes/book.routes';
import createHttpError from 'http-errors';
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from './models/user.model';

connect();

const portNumber = 8080;
const app = express();
app.use(session({
  secret: 'leon',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.session());
passport.use(
  new LocalStrategy({ usernameField: 'username', passwordField: 'password', },
    async (username: string, password: string, done: (error: any, user?: any, options?: any) => void) => {
      try {
        const user = await UserModel.findOne({ email: username });
       
        if (!user) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        // const valid = await user.validPassword(password);

        // if (!valid) {
        //   return done(null, false, { message: 'Incorrect username or password.' });
        // }
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
)

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
app.use(express.static(path.join(__dirname, 'public')));


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
