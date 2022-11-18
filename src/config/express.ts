import express from "express";
import path from "path";
import morgan from "morgan";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

import { Definition } from "src/config/definition";
import { logger, stream } from "src/config/logger";

import indexRotuer from "src/route/index";
import signRouter from "src/route/api/sign";
import contentsRouter from "src/route/api/contents";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Logger [ morgan ]
 */
app.use(morgan("combined", { stream }));

/**
 * Route
 */
app.use("/", indexRotuer);
app.use("/sign", signRouter);
app.use("/contents", contentsRouter);

/**
 * Swagger
 */
if (Definition.server.mode !== "production") {
    logger.info("Swagger On : /api-docs");
    const swaggerSpec = YAML.load(
        path.join(__dirname, "../../dist/swagger.yaml")
    );
    const swaggerOptions = { docExpansion: "none" };
    const swaggerUiOptions = { explorer: true };
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, swaggerUiOptions, swaggerOptions)
    );
}

export default app;
