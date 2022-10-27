import Thought from '../models/Thought.js';
import User from '../models/User.js';

export default class ThoughtController {
	constructor() {}

	static async showThoughts(req, res) {
		res.render('thoughts/home');
	}
	static async dashboard(req, res) {
		const userId = req.session.userid;
		const user = await User.findOne({
			where: { id: userId },
			include: Thought,
			plain: true, //somente dados puros
		});
		//convertendo os valores do user para arrays
		const thoughts = user.Thoughts.map((thought) => thought.dataValues);
		//checar se usuario existe
		if (!user) {
			res.redirect('/login');
		}

		res.render('thoughts/dashboard', { thoughts });
	}
	static createThought(req, res) {
		res.render('thoughts/create');
	}
	static async addPost(req, res) {
		try {
			const thought = { title: req.body.title, UserId: req.session.userid };
			await Thought.create(thought);
			req.flash('message', 'Pensamento Criado com sucesso');
			req.session.save(() => res.redirect('/thoughts/dashboard'));
		} catch (error) {
			console.log(err);
		}
	}
}
