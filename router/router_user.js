//Inicialização dos modulos
const express = require("express")
const router = express.Router()
const Usuario = require("../models/mod_usuario")
const bcrypt = require("bcryptjs")
const passport = require("passport")

//Rota de Login e Cadastro
router.get("/", (req, res) => {
    res.render("home")
})


//Rota Login
router.post("/login", (req, res,next) => {
    passport.authenticate("local", {
        successRedirect: "/listausuarios",
        failureRedirect: "/",
        failureFlash: true
    })(req, res, next)
})

//Rota ADM Lista de Cadatros
router.get("/listausuarios", (req, res) => {
    Usuario.findAll().then((Results) => {
        res.render("listauser", { resultados: Results })
    }).catch((err) => {
        req.flash("error_msg", `Erro: ${err}`)
        res.redirect("/")
    })
})


//Rota de Login e Cadastro
router.post("/adduser", (req, res) => {

    var formadd_erro = []

    if (!req.body.nNome || typeof req.body.nNome == undefined || req.body.nNome == null) {
        formadd_erro.push({ texto: "Nome inválido!" })
    }
    if (!req.body.nSobrenome || typeof req.body.nSobrenome == undefined || req.body.nSobrenome == null) {
        formadd_erro.push({ texto: "Sobrenome inválido!" })
    }
    if (!req.body.ncEmail || typeof req.body.ncEmail == undefined || req.body.ncEmail == null) {
        formadd_erro.push({ texto: "Email inválido!" })
    }
    if (!req.body.ncPass || typeof req.body.ncPass == undefined || req.body.ncPass == null) {
        formadd_erro.push({ texto: "Senha inválido!" })
    }
    if (formadd_erro.length > 0) {
        res.render("home", { formadd_erro: formadd_erro })
    } else {
        Usuario.count({
            where: {
                email: req.body.ncEmail
            }
        }).then((Results) => {
            if (!Results) {
                //Gera o Salt na var: salt
                bcrypt.genSalt(10, (erro, salt) => {
                    // Transforma a Senha em Hash na var: hash
                    bcrypt.hash(req.body.ncPass, salt, (erro, hash) => {
                        if (erro) {
                            req.flash("error_msg", "Erro no cadastro, tente novamente.")
                            res.redirect("/")
                        } else {
                            //Cadastra usuario novo do BD
                            Usuario.create({
                                firstname: req.body.nNome,
                                lastname: req.body.nSobrenome,
                                email: req.body.ncEmail,
                                password: hash
                            }).then(() => {
                                req.flash("success_msg", "Cadastro feito com Sucesso! Verifique seu email.")
                                res.redirect("/")
                            }).catch((err) => {
                                req.flash("error_msg", "Erro no cadastro, tente novamente.")
                                res.redirect("/")
                            })
                        }
                    })
                })


            } else {
                //Usuario Ja existente
                req.flash("error_msg", "Email já cadastrado.")
                res.redirect("/")
            }


            /* res.render('cadastro', {
                 result: results,
                 email: req.body.ncEmail
             })
             */
        }).catch((err) => {
            res.send(`Erro: ${err}`)
        })


    }
})



module.exports = router