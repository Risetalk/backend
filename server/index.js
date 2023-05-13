// Local Dependencies.
const app = require("./settings/");
const sequelize = require("../database/");

// Models Import.
require("../database/models/relationships");

// Default Port.
const PORT = 3001;

// Main Function of the Server.
function main() {
  // Put the Server to Listen.
  app.listen(PORT, async () => {
    // Data Syncronization.
    await sequelize.sync();
    // Listening Verify.
    console.log(`server listening on port: ${PORT}`);
  });
}

// Execution Server.
main();
