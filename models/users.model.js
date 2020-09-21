
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('Users', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
        },
        email: {
			allowNull: false,
			type: DataTypes.STRING,
        },
        imageUrl:{
            allowNull: false,
			type: DataTypes.STRING,
        }
	});
};