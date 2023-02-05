const router = require("express").Router();
const bcrypt = require("bcryptjs"); // encripter
const { User } = require("../../db"); // modelo de usuario
const { check, validationResult } = require("express-validator"); // validator de express
const moment = require("moment"); // moment para manejar fechas
const jwt = require("jwt-simple") // creacion de web tokens


router.post(
  "/register",
  [
    check("username", "El nombre de usuario es obligatorio").notEmpty(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    check("email", "El email es obligatorio").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errores: errors.array() });

    req.body.password = bcrypt.hashSync(req.body.password, 10); // (dato password, veces que se aplica el algoritmo de encriptacion)
    const user = await User.create(req.body);
    res.json(user);
  }
);

router.post("/login", async (req, res) => {
    const user = await User.findOne( { where: { email: req.body.email } } );
    if(user){
        const equals = bcrypt.compareSync(req.body.password, user.password);
        if(equals){
            res.json({ success: createToken(user) });
        } else {
            res.json( { error: "Error en usuario y/o contraseña" } );
        }
    } else {
        res.json( { error: "Error en usuario y/o contraseña" } );
    }
});

const createToken = (user) => {
    const payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, "minutes").unix()
    }

    return jwt.encode(payload, "frase secreta");
}

module.exports = router;
