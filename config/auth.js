const localStrategy = require("passport-local").Strategy
const Usuario = require("../models/mod_usuario")
const bcrypt = require("bcryptjs")


module.exports = (passport) => {

    passport.use(new localStrategy({ usernameField: 'nlEmail', passwordField: 'nlPass' }, (email, senha, done) => {
        Usuario.findAll({
            limit: 1,
            where: {
                email: email
            }
        }).then((usuario) => {
            if (!usuario) {
                return done(null, false, { message: "Esta conta não existe!" })
            } else {

                bcrypt.compare(senha, usuario[0].password, (erro, batem) => {
                    if (batem) {
                        return done(null, usuario, { message: `Usuario Locado com sucesso` })
                    } else {
                        console.log(usuario)
                        return done(null, false, { message: `Senha Incorreta!` })
                    }
                })
            }
        }).catch((err) => {
            req.flash("error_msg", `Erro ao efetuar Login.Erro: ${err}`)
            res.redirect("/")
        })
    }))

    passport.serializeUser((usuario, done) => {
        console.log(usuario[0].id)
        done(null, usuario[0].id)
    })
    passport.deserializeUser((id, done) => {
        Usuario.findByPk(id).then((usuario) => {
            return done(null, usuario)
        }).catch((err) => {
            return done(null, false, { message: usuario.erro })
        })
    })
}
