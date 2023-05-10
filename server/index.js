const app = require("./settings/index");
const sequelize = require("../database/index");
const Comment = require("../database/models/Comment.model");
const Course = require("../database/models/Course.model");
const PaymentMethod = require("../database/models/PaymentMethod.model");
const Post = require("../database/models/Post.model");
const User = require("../database/models/User.model");

const PORT = process.env.PORT || 3001;

function main() {
    app.listen(PORT, async () => {
        await sequelize.sync()
        console.log(`server listening on port: ${PORT}`);
    })
}

main();
