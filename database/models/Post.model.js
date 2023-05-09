const {DataTypes} = require("sequelize");
const sequelize = require("../index.js");

const Post = sequelize.define("post", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  background_image: {
    type: DataTypes.STRING(50),
    allowNull: false,
  }
},
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = Post;