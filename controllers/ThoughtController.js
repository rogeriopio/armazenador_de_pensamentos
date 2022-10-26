import Thoughts from '../models/Thought.js';
import User from '../models/User.js';

export default class ThoughtController {
	constructor() {}

	static async showThoughts(req, res) {
		res.render('thought/home');
	}
}
