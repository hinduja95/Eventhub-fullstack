const { DataTypes, Sequelize } = require('sequelize');
module.exports = (eventDB) => {
  const Events = eventDB.define('events',
    {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    event_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    event_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    event_location: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    event_link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    event_video_link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    event_image_link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    publish_from: {
      type: DataTypes.DATE,
      allowNull: false


    },
    publish_to: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  },
  {
    updatedAt:false,
    createdAt:false,
    timestamps: false,
    underscored: false,
  });


  return Events;
};
