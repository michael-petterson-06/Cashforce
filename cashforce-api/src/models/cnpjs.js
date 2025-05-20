const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Cnpjs.init(sequelize, DataTypes);
}

class Cnpjs extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cnpj: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "cnpj"
    },
    companyType: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cnpjs',
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
        name: "cnpj",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cnpj" },
        ]
      },
    ]
  });
  }
}
