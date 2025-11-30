import expressJSDocSwagger from "express-jsdoc-swagger";

export function swaggerDocs(app) {
    const options = {
      info: {
        version: "1.0.0",
        title: "API Documentation",
        description: "Documentation for your Express API",
      },
      baseDir: "./",
      filesPattern: ["./src/controllers/**/*.js"],
      swaggerUIPath: "/api-docs",
      exposeSwaggerUI: true,
      exposeApiDocs: false,
      apiDocsPath: "/api-docs-json",
    };
  
    expressJSDocSwagger(app)(options);
  }