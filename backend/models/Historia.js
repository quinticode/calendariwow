const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Historia = sequelize.define("Historia", {
  titulo: { type: DataTypes.STRING, allowNull: false },
  autor: { type: DataTypes.STRING, allowNull: false },
  texto: { type: DataTypes.TEXT, allowNull: false },
  imagem: { type: DataTypes.STRING },
  genero: { type: DataTypes.STRING }
});

module.exports = Historia;