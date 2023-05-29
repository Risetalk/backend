// Local Dependencies.
const app = require("./settings/");
const sequelize = require("../database/");
const swaggerDocs = require("./settings/docs/v1/swagger");

// Models Import.
require("../database/models/relationships");

// Default Port.
const PORT = 3001;

// Main Function of the Server.
function main() {
  // Put the Server to Listen.
  app.listen(PORT, async () => {
    // Data Syncronization.
    await sequelize.sync({force: false});
    // Listening Verify.
    console.log(`server listening on http://localhost:${PORT}`);

    swaggerDocs(app, PORT);
    
  });
}

// Execution Server.
main();
