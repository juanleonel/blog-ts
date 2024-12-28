import express, { Request, Response } from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as routes from './routes/index';
import { connect } from './database/connection';
import bookRoutes from './routes/book.routes';
import authRoutes from './routes/auth.routes';
import createHttpError from 'http-errors';
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from './models/user.model';

connect();

const portNumber = 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

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

        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);

    done(null, user);
  } catch(err) {
    done(err);
  }
});

app.set('port', portNumber);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoutes);
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
