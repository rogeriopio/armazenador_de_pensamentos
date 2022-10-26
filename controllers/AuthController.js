import User from '../models/User.js';

import bcrypt from 'bcryptjs';

//vai ficar assim pois não realzia interação com banco de dados
export default class AuthController {
	constructor() {}

	static login(req, res) {
		res.render('auth/login');
	}
	static register(req, res) {
		res.render('auth/register');
	}
	static async registerPost(req, res) {
		const { name, email, pass, pass2 } = req.body;
		//criar validações
		//password match validation
		if (pass != pass2) {
			//enviar mensagem via flash message,como se fosse um res.render
			req.flash('message', 'As senhas não confere tente novamente!');
			res.render('auth/register');
			return;
		}
		//check if user exists
		const checkIfUserExists = await User.findOne({ where: { email: email } });
		if (checkIfUserExists) {
			req.flash('message', 'O email ja está em uso');
			res.render('auth/register');
			return;
		}
		//create Password
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(pass, salt);
		const user = { name, email, password: hashedPassword };
		try {
			const createdUser = await User.create(user);

			//inicializar a sessão
			req.session.userid = createdUser.id;

			req.flash('message', 'Cadastro Realizado');
			//salvar sessão com os dados novo no cookies
			req.session.save(() => {
				res.redirect('/');
			});
		} catch (error) {}
	}
	static logout(req, res) {
		req.session.destroy();

		res.redirect('/login');
	}
}
