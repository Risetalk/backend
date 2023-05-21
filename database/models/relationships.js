// Local Dependencies ( Models Section )
const User = require("./user.model");
const Course = require("./course.model");
const Post = require("./post.model");
const PostComment = require("./postComment.model");
const PaymentMethod = require("./paymentMethod.model");
const Video = require("./video.model");
const CourseComment = require("./courseComment.model");
const Lesson = require("./lesson.model");

// Relation Ships.

// User to Course.
User.hasMany(Course, { foreignKey: 'userId' });
Course.belongsTo(User, { foreignKey: 'userId' });


//User to bought courses.
User.belongsToMany(Course, { through: 'boughtCourses' });
Course.belongsToMany(User, { through: "boughtCourses" });

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

// User to PaymentMethod.
User.hasMany(PaymentMethod);
PaymentMethod.belongsTo(User);


// Course to Lesson.

Course.hasMany(Lesson, { foreignKey: 'courseId' });
Lesson.belongsTo(Course, { foreignKey: 'courseId' });


// Lesson to Video.

Lesson.hasMany(Video, { foreignKey: 'lessonId' });
Video.belongsTo(Lesson, { foreignKey: 'lessonId' });


module.exports = {
  User,
  Course,
  Post,
  CourseComment,
  PostComment,
  PaymentMethod,
  Video,
};
