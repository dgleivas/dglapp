//Inicialização dos modulos
const express = require("express")
const router = express.Router()


//Rota de Login e Cadastro
router.get("/", (req, res) => {
    res.render("home")
})


//Rota Login
router.post("/login", (req, res) => {
    res.render("home")
})

//Rota de Login e Cadastro
router.post("/adduser", (req, res) => {
    res.render("home")
})



module.exports = router