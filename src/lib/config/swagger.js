import expressJSDocSwagger from "express-jsdoc-swagger";

export function swaggerDocs(app) {
  const options = {
    info: {
      version: "1.0.0",
      title: "API Documentation",
      description: "Documentation API",
    },
    security: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    baseDir: process.cwd(),
    filesPattern: ["./src/controllers/**/*.js"],
    swaggerUIPath: "/api-docs",
    exposeSwaggerUI: true,
    exposeApiDocs: true,
    apiDocsPath: "/api-docs-json",
    swaggerUiOptions: {
      persistAuthorization: true,
    },
  };

  expressJSDocSwagger(app)(options);
}