// THird Party Dependencies.
const { DataTypes } = require("sequelize");

// Local Dependencies.
const sequelize = require("../");

// Users Model.
const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    profile_picture: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    date_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    is_tutor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_staff: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      defaultValue: false,
    },
    about_me: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    // No pluralization.
    freezeTableName: true,
  }
);

module.exports = User;
