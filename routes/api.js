const router = require("express").Router();

const middlewares = require("./middlewares");
const apiFilmsRouter = require("./api/films"); // Router de Peliculas
const apiUsersRouter = require("./api/users"); // Router de Usuarios

router.use("/films", middlewares.checkToken, apiFilmsRouter); // ruta /films -> Router de Peliculas
router.use("/users", apiUsersRouter); // ruta /users -> Router de Usuarios

module.exports = router;