const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return orderportions.init(sequelize, DataTypes);
}

class orderportions extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nDup: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dVenc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    vDup: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    availableToMarket: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'orderportions',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "orderId",
        using: "BTREE",
        fields: [
          { name: "orderId" },
        ]
      },
    ]
  });
  }
}
