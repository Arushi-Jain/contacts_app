
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('Contacts', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		ownerEmail: {
			allowNull: false,
			type: DataTypes.STRING,
        },
		name: {
			allowNull: false,
			type: DataTypes.STRING,
        },
        email: {
			type: DataTypes.STRING,
        },
        phone: {
			type: DataTypes.STRING,
		},
		photoUrl: {
			type: DataTypes.STRING,
		},
	});
};