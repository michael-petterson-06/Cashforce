const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return offers.init(sequelize, DataTypes);
}

class offers extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tax: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tariff: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    adValorem: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    float: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    iof: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expiresIn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    paymentStatusSponsor: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    paymentStatusProvider: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    sponsorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sponsors',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'offers',
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
      {
        name: "sponsorId",
        using: "BTREE",
        fields: [
          { name: "sponsorId" },
        ]
      },
    ]
  });
  }
}
