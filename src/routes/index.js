const express = require("express");
require("express-async-errors"); //captura de errores de middleware
const cors = require("cors");
const helmet = require("helmet"); // seguridad
const compression = require("compression"); //comprimir peticiones http rapidez
const { ErrorMiddleware, NotFoundMiddleware } = require("../middlewares");

module.exports = function({ HomeRoutes }) {
    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes.use(express.json()).use(cors()).use(helmet()).use(compression());

    apiRoutes.use("/home", HomeRoutes);

    router.use("/v1/api", apiRoutes);

    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);

    return router;
};