import User from '../models/User.js';

import bcrypt from 'bcryptjs';

//vai ficar assim pois não realzia interação com banco de dados
export default class AuthController {
	constructor() {}

	static async login(req, res) {
		res.render('auth/login');
	}
	static async register(req, res) {
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
	}
}
