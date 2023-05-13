const app = require("./settings/index");
const sequelize = require("../database/index");

require("../database/models/relationships");

const PORT = 3001;

//process.env.PGPORT ||

function main() {
    app.listen(PORT, async () => {
        await sequelize.sync({force:false})
        console.log(`server listening on port: ${PORT}`);
    })
}

main();
