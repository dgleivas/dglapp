//Inicialização dos modulos
const express = require("express")
const handlebars = require("express-handlebars") //link entre o backend com o frontend
const bodyparser = require("body-parser") //utilizar uma variavel do frontend para o backend
const usuarios = require("./models/mod_usuario")
const path = require("path")
const router_user = require ("./router/router_user")

// Config
    //Express
        const app = express()
    //Handlebars
        app.set('view engine', 'handlebars')
        app.engine('handlebars', handlebars({
            defaultlayout: 'main',
            helpers: {
                toJSON: (object) => { // função que transforma o objeto em json
                    return JSON.stringify(object);
                }
            }
        }))
    //Body-parser
        app.use(bodyparser.urlencoded({
            extended: false
        }))
        app.use(bodyparser.json())
    //Publico
        app.use(express.static(path.join(__dirname, "public")));

//Local Router

/*
app.get('/', (req, res) => {
    res.render('home')
})
*/




//External Router
app.use("/",router_user)


app.post('/add', (req, res) => {

    usuarios.findAll({
        where: {
            email: req.body.ncEmail
        }
    }).then((results) => {
        //trabalhar a variavel results aqui para inserir um novo cadastro se ela retoranr vazia
        res.render('cadastro', {
            result: results,
            email: req.body.ncEmail
        })
    }).catch((err) => {
        res.send(`Erro: ${err}`)
    })

    /*
       post.create({
           firstname: req.body.iNome,
           lastname:  req.body.iSobrenome,
           email:  req.body.icEmail,
           password:  req.body.icPass
       }).then(function () {
           res.render('cadastro_sucesso')
       }).catch(function (err) {
           res.render('cadastro_erro')
       })
       */
})



//Footer
const port = 3333
var server = app.listen(port,() => {
    var port = server.address().port;
    console.log(`Connected to http://localhost:${port}`);
});









