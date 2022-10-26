//vai ficar assim pois não realzia interação com banco de dados
export default class AuthController {
	constructor() {}

	static async login(req, res) {
		res.render('auth/login');
	}
	static async register(req, res) {
		res.render('auth/register');
	}
}
