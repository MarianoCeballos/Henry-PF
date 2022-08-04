const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'payments',
    {
      mpID: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      items: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      gift: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      giftrecipient: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
