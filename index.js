import express from 'express';
import { engine, create } from 'express-handlebars';
// import conn from './db/conn.js';
import { sequelize as conn } from './db/conn.js';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import flash from 'express-flash';
import path, { dirname } from 'path';
import os from 'os';
const FileStore = sessionFileStore(session);
const app = express();
console.log('app: ');
const port = 3000;

//Models
import Thought from './models/Thought.js';
import User from './models/Thought.js';
import { routerThoughts } from './routes/thoughtsRoutes.js';
import ThoughtController from './controllers/ThoughtController.js';
import { routerAuth } from './routes/authroutes.js';

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
//public path
app.use(express.static('public'));

//midleware  para pegar o body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//session midleware onde o express ira salvar sessoes
app.use(
	session({
		name: 'session',
		secret: 'nosso_secret',
		resave: false,
		saveUninitialized: false,
		store: new FileStore({
			logFn: function () {},
			path: path.join(os.tmpdir('sessions')),
		}),
		cookie: {
			secure: false,
			maxAge: 3600000,
			//não se pode usar max age ou expires junto senao buga
			//expires: new Date(Date.now() + 3600000),
		},
		httpOnly: true, //Produção mudar para https
	})
);
//flash messages
app.use(flash());

//session para resposta

app.use((req, res, next) => {
	//criando logica para ver se vai dar andamento no sistema

	if (req.session.userid) {
		//se tiver logado pega o id do usuario,passa para resposta e depois continua(next())
		res.locals.session = req.session;
	}
	next();
});
app.use('/thought', routerThoughts);
app.use('/', routerAuth);
app.get('/', ThoughtController.showThoughts);

conn.sync()
	.then(() => app.listen(port))
	.catch((err) => {});
