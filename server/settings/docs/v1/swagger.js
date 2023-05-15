// Third Party Dependencies.
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger Options.
const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "RiseTalk API - Documentation v0.0.1 .",
      version: "0.0.1",
      description: "Documentation for the RiseTalk API. Built",
      // license: {
      //   name: "MIT",
      //   url: "https://spdx.org/licenses/MIT.html",
      // },
      contact: {
        name: "RiseTalk Web Site",
        url: "https://risetalk.tech",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
      {
        url: "http://46.101.105.17:3001",
        description: "Production Server",
      },
    ],
    tags: [
      {
        name: "Courses",
        description: "Endpoints for courses in the system",
      },
      {
        name: "Users",
        description: "Endpoints for users in the system",
      },
      {
        name: "Videos",
        description: "Endpoints for videos in the system",
      },
      {
        name: "Posts",
        description: "Endpoints for posts in the system",
      },
      {
        name: "Payment Methods",
        description: "Endpoints for payment methods in the system",
      },
      {
        name: "Post Comments",
        description: "Endpoints for post comments in the system",
      },
      {
        name: "Course Comments",
        description: "Endpoints for course comments in the system",
      },

    ],
  },
  apis: [
    "./server/settings/routes/*.routes.js",
    "./server/settings/docs/schemas/*.schemas.js",
  ],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      // Custom Topbar background color orange heigth 30px .
      customCss: ".swagger-ui .topbar { background-color: #ff6600; height: 50px; } .swagger-ui .topbar img { display:none }",
      // Change Theme Dark from Swagger UI Page
      customCssUrl:"https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css",

      // Custom title and icon
      customSiteTitle: "RiseTalk API v0.0.1 .",
    })
  );
  // Make our docs in JSON format available
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api-docs`
  );
};

module.exports = swaggerDocs;
