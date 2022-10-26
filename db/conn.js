import { Sequelize } from 'sequelize';
//cosnt {Sequelize} = require('sequelize')

export const sequelize = new Sequelize('pensamentos', 'root', 'docker', {
	host: 'localhost',
	dialect: 'mysql',
});

try {
	sequelize.authenticate();
	console.log('Conectado no banco');
} catch (error) {
	console.log('Erro ao conectar', error);
}
//export default sequelize;
//module.exports =sequilize
