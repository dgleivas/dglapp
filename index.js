//Inicialização dos modulos
const express = require("express")
const session = require("express-session")
const flash = require("connect-flash")
const handlebars = require("express-handlebars") //link entre o backend com o frontend
const bodyparser = require("body-parser") //utilizar uma variavel do frontend para o backend
const path = require("path")
const router_user = require("./router/router_user")

// Config
    //Express
      const app = express()
    //Sessão
        app.use(session({
            secret: "123456789", // chave da sessão
            resave: true,
            saveUninitialized: true

        }))
        app.use(flash())

    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })

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



//External Router

//Rota para Raiz
    app.use("/", router_user)


//Footer
    const port = 3333
    var server = app.listen(port, () => {
        var port = server.address().port;
        console.log(`Connected to http://localhost:${port}`);
    });









