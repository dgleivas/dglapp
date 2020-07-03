//Inicialização dos modulos
const express = require("express")
const handlebars = require("express-handlebars") //link entre o backend com o frontend
const bodyparser = require("body-parser") //utilizar uma variavel do frontend para o backend
const usuarios = require("./models/mod_usuario")
const path = require("path")
const router_user = require("./router/router_user")

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

//Rota para Raiz
app.use("/", router_user)


//Footer
const port = 3333
var server = app.listen(port, () => {
    var port = server.address().port;
    console.log(`Connected to http://localhost:${port}`);
});









