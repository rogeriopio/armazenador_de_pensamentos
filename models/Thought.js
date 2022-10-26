import { DataTypes } from 'sequelize';
import { sequelize as db } from '../db/conn.js';
import User from './User.js';

const Thought = db.define('Thought', {
	title: { type: DataTypes.STRING, allowNull: false, require: true },
});
Thought.belongsTo(User);
User.hasMany(Thought);

export default Thought;
