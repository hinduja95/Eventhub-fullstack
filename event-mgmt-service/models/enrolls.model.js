const { DataTypes, Sequelize } = require('sequelize');
module.exports = (eventDB) => {
  const Enrolls = eventDB.define('enrolls',
    {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    full_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email_address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mobile: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    district: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    meta_1:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    meta_2:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    meta_3:{
        type:DataTypes.TEXT,
        allowNull:true
    },

    
    
  },
  {
    updatedAt:false,
    createdAt:false,
    timestamps: false,
    underscored: false,
  });


  return Enrolls;
};
