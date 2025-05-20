const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Orders.init(sequelize, DataTypes);
}

class Orders extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    orderNfId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "orderNfId"
    },
    orderNumber: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    orderPath: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "orderPath"
    },
    orderFileName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "orderFileName"
    },
    orderOriginalName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "orderOriginalName"
    },
    emissionDate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pdfFile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    emitedTo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nNf: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CTE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cnpjId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cnpjs',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'buyers',
        key: 'id'
      }
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'providers',
        key: 'id'
      }
    },
    orderStatusBuyer: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "0"
    },
    orderStatusProvider: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "0"
    },
    deliveryReceipt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cargoPackingList: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliveryCtrc: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders',
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
        name: "orderNfId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderNfId" },
        ]
      },
      {
        name: "orderPath",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderPath" },
        ]
      },
      {
        name: "orderFileName",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderFileName" },
        ]
      },
      {
        name: "orderOriginalName",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderOriginalName" },
        ]
      },
      {
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "buyerId",
        using: "BTREE",
        fields: [
          { name: "buyerId" },
        ]
      },
      {
        name: "providerId",
        using: "BTREE",
        fields: [
          { name: "providerId" },
        ]
      },
      {
        name: "cnpjId",
        using: "BTREE",
        fields: [
          { name: "cnpjId" },
        ]
      },
    ]
  });
  }
}
