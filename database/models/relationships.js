const User = require("./User.model");
const Course = require("./Course.model");
const Post = require("./Post.model");
const Comment = require("./Comment.model");
const PaymentMethod = require("./PaymentMethod.model");
const Video = require("./video.model");
const CommentCourse=require("./CommentCourse.model");

User.belongsToMany(Course,{through:"User_Course"});
Course.belongsToMany(User, { through: "User_Course" });

Course.hasMany(CommentCourse);
CommentCourse.belongsTo(Course);
User.hasMany(CommentCourse);
CommentCourse.belongsTo(User);
User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
User.hasMany(PaymentMethod);
PaymentMethod.belongsTo(User);
Course.hasMany(Video);
Video.belongsToMany(Course, {through: "Course_Video"});


module.exports = {
    User,
    Course,
    Post,
    Comment,
    PaymentMethod,
    Video
}