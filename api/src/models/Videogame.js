const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type:DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    date:{
      type:DataTypes.STRING,
      allowNull:true
    },
    rating:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    platforms:{
      type:DataTypes.JSON,
      allowNull: false,
    },
    description:{
      type:DataTypes.TEXT,
      allowNull: false,
    },
    background_image:{
      type: DataTypes.STRING,
    },
    
  });
};
