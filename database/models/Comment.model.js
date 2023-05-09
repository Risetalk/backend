const {DataTypes} = require("sequelize");
const sequelize = require("../index");

const Comment = sequelize.define("comment", {
  id: {
    type: DataTypes.UUID,
    primaryKey:true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull:false,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull:false
  }
},
  {
    timestamps: false,
    freezeTableName: true
  }
);