//imports sequelize class and data
const { Model, DataTypes } = require('sequelize');

//imports connection
const sequelize = require('../config/connection.js');

//extends category from sequelize 
class Category extends Model {}

//Category mdoel
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

//exports model Category
module.exports = Category;
