// Local Dependencies ( Models Section )
const User = require("./user.model");
const Course = require("./course.model");
const Post = require("./post.model");
const PostComment = require("./postComment.model");
const PaymentMethod = require("./paymentMethod.model");
const Video = require("./video.model");
const CourseComment = require("./courseComment.model");

// Relation Ships.

// User to Course.
User.belongsToMany(Course, { through: "user_course" });
Course.belongsToMany(User, { through: "user_course" });

// Course to CourseComment.

Course.hasMany(CourseComment, { foreignKey: 'courseId' });
CourseComment.belongsTo(Course, { foreignKey: 'courseId' });

// User to CourseComment.
User.hasMany(CourseComment, { foreignKey: 'userId' });
CourseComment.belongsTo(User, { foreignKey: 'userId' });

// User to Post.
User.hasMany(Post);
Post.belongsTo(User);

// Post to PostComment.
Post.hasMany(PostComment);
PostComment.belongsTo(Post);

// User to PostComment
User.hasMany(PostComment);
PostComment.belongsTo(User)

// User to PaymentMethod.
User.hasMany(PaymentMethod);
PaymentMethod.belongsTo(User);

// Course to Video.
Course.hasMany(Video, { foreignKey: 'courseId' });
Video.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = {
  User,
  Course,
  Post,
  CourseComment,
  PostComment,
  PaymentMethod,
  Video,
};
