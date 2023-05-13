// Third Party Dependencies.
const { DataTypes } = require("sequelize");

// Local Dependencies.
const sequelize = require("../");

// Payment Methods Model.
const PaymentMethod = sequelize.define(
  "payment_method",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    card_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    account_holder: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    wallet_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    is_paypal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_mastercard: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_visa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_wallet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    // No pluralization.
    freezeTableName: true,
  }
);

module.exports = PaymentMethod;
