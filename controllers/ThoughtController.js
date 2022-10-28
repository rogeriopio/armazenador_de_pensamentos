import Thought from '../models/Thought.js';
import User from '../models/User.js';

export default class ThoughtController {
	constructor() {}

	static async showThoughts(req, res) {
		/*podemos usar dessa forma
		const thoughtsData = await Thought.findAll({
			include: User,
		});
				const thoughts = thoughtsData.map((result) => result.get({ plain: true }));

		*/
		//ou dess
		const thoughts = await Thought.findAll({
			include: User,
			raw: true,
			nest: true,
		});

		res.render('thoughts/home', { thoughts });
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
		//saber se os pensamentos estão vazios
		let emptyThoughts = false;

		if (thoughts.length === 0) {
			emptyThoughts = true;
		}
		res.render('thoughts/dashboard', { thoughts, emptyThoughts });
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
	static async removeThought(req, res) {
		const id = req.body.id;
		const userId = req.session.userid;

		try {
			await Thought.destroy({ where: { id: id, Userid: userId } });

			req.flash('message', 'Pensamento removido com sucesso!!');

			req.session.save(() => res.redirect('/thoughts/dashboard'));
		} catch (error) {
			console.log(error);
		}
	}

	static async updateThought(req, res) {
		const userId = req.params.id;
		const title = req.body.title;

		const thought = await Thought.findOne({ where: { id: userId }, raw: true });

		res.render('thoughts/edit', { thought });
	}

	static async updateThoughtPost(req, res) {
		const userId = req.body.id;
		const title = req.body.title;
		await Thought.update({ title }, { where: { id: userId } });
		res.redirect('/thoughts/dashboard');
	}
}
