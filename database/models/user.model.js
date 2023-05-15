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
    },
    last_name: {
      type: DataTypes.STRING(50),
    },
    user_name: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    profile_picture: {
      type: DataTypes.STRING,
      defaultValue: "https://ionicframework.com/docs/img/demos/avatar.svg",
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    date_birth: {
      type: DataTypes.DATEONLY,
    },
    is_tutor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    is_staff: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    about_me: {
      type: DataTypes.TEXT,
      defaultValue: "Your description here...",
      allowNull: true,
    },
  },
  {
    // No pluralization.
    freezeTableName: true,
  }
);

module.exports = User;
