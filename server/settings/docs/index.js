// Swagger Options.
const options = {
    definition: {
      swagger: "2.0",
      openapi: "3.1.0",
      info: {
        title: "RiseTalk API Documentation V0.0.1 .",
        version: "0.0.1",
        description:
          "Documentation for the RiseTalk API. Built",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3001",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  

module.exports = options;