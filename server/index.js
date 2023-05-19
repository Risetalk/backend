// Local Dependencies.
const app = require("./settings/");
const sequelize = require("../database/");
const swaggerDocs = require("./settings/docs/v1/swagger");
const { notFount, errorHandler } = require("./settings/middleware/user/errorHanddler");
// Models Import.
require("../database/models/relationships");

// Default Port.
const PORT = 3001;

app.use(notFount)
app.use(errorHandler)

// Main Function of the Server.
function main() {
  // Put the Server to Listen.
  app.listen(PORT, async () => {
    // Data Syncronization.
    await sequelize.sync();
    // Listening Verify.
    console.log(`server listening on http://localhost:${PORT}`);

    swaggerDocs(app, PORT);
    
  });
}

// Execution Server.
main();
