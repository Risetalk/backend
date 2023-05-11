const User = require("./User.model");
const Course = require("./Course.model");
const Post = require("./Post.model");
const Comment = require("./Comment.model");
const PaymentMethod = require("./PaymentMethod.model");
const Video = require("./video.model");


User.belongsToMany(Course,{through:"User_Course"});
Course.belongsToMany(User, { through: "User_Course" });
User.hasMany(Comment);
Comment.belongsTo(User);
User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
User.hasMany(PaymentMethod);
PaymentMethod.belongsTo(User);
Course.belongsToMany(Video, {through: "Course_Video"});
Video.belongsToMany(Course, {through: "Course_Video"});


module.exports = {
    User,
    Course,
    Post,
    Comment,
    PaymentMethod,
    Video
}