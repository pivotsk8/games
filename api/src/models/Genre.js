const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Genres', {
      name:{
        type:DataTypes.STRING,
        allowNull: true,

      },
      id:{
        type:DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      }
  },
  {
    timestamps: false,
  }
  );
};