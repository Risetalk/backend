const User=require("./User.model");
const Course=require("./Course.model");



User.belongsToMany(Course,{through:"User_Course"});
Course.belongsToMany(User, { through: "User_Course" });


module.exports={
    User,
    Course,
}