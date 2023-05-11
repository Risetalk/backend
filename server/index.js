const app = require("./settings/index");
const sequelize = require("../database/index");

require("../database/models/relationships");

const PORT = process.env.PGPORT || 3001;

function main() {
    app.listen(PORT, async () => {
        await sequelize.sync()
        console.log(`server listening on port: ${PORT}`);
    })
}

main();
