//Inicialização dos modulos
const express = require("express")
const router = express.Router()
const usuarios = require("../models/mod_usuario")


//Rota de Login e Cadastro
router.get("/", (req, res) => {
    res.render("home")
})


//Rota Login
router.post("/login", (req, res) => {
    res.send("Rota Login")
})

//Rota de Login e Cadastro
router.post("/adduser", (req, res) => {


    usuarios.count({
        where: {
            email: req.body.ncEmail
        }
    }).then((Results) => {
        //trabalhar a variavel results aqui para inserir um novo cadastro se ela retoranr vazia
        //const results = JSON.stringify(Results)
        if (!Results) {
            usuarios.create({
                firstname: req.body.nNome,
                lastname:  req.body.nSobrenome,
                email:  req.body.ncEmail,
                password:  req.body.ncPass
            }).then(function () {
                res.send('Cadastro Feito com Sucesso')
            }).catch(function (err) {
                res.send(`Erro: ${err}`)
            })
        } else {
            res.send("Ja existente")
        }


        /* res.render('cadastro', {
             result: results,
             email: req.body.ncEmail
         })
         */
    }).catch((err) => {
        res.send(`Erro: ${err}`)
    })

})



module.exports = router