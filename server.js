// set up ========================
const
    express         = require('express'),
    exphbs          = require('express-handlebars'),
    hbsLayouts      = require('handlebars-layouts'),
    bodyParser      = require('body-parser'),      // pull information from HTML POST (express4)
    cookieParser    = require('cookie-parser'),
    errorhandler    = require('errorhandler'),
    csrf            = require('csurf'),
    morgan          = require('morgan'),
    favicon         = require('serve-favicon'),
    router          = require('./routes/router'),
    database        = require('./lib/database'),
    app             = express(),                  // create app w/ express
    port            = 4200,

    cors            = require("cors");

// configuration =================

class Server {

    constructor() {
        this.initDbSeeder();
        this.initViewEngine();
        this.initExpressMiddleWare();
        this.initCustomMiddleware();
        this.initRoutes();
        this.start();
    }

    start() {
        app.listen(port, (err) => {
            console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
        });
    }

    initViewEngine() {
        const hbs = exphbs.create({
            extname: '.hbs',
            defaultLayout: 'master'
        });
        app.engine('hbs', hbs.engine);
        app.set('view engine', 'hbs');
        hbsLayouts.register(hbs.handlebars, {});
    }

    initExpressMiddleWare() {
        app.use(favicon(__dirname + '/dist/Prospection-Manager/assets/images/favicon.ico'));
        app.use(express.static(__dirname + '/dist/Prospection-Manager'));
        app.use(morgan('dev'));

        // app.set('port', process.env.PORT || port);
        // app.set('view engine', 'pug');

        app.use(bodyParser.urlencoded({ extended: true }));   // parse application/x-www-form-urlencoded
        app.use(bodyParser.json()); // parse application/json
        app.use(errorhandler());
        app.use(cookieParser());

        var corsOptions = {
          origin: "https://prospections.herokuapp.com/",
          optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        };
        app.use(cors(corsOptions));


        // app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
        app.use(bodyParser.json())

        /*
        app.use(csrf({ cookie: true }));
        app.use((req, res, next) => {
            let csrfToken = req.csrfToken();
            res.locals._csrf = csrfToken;
            res.cookie('XSRF-TOKEN', csrfToken);
            next();
        });
        */

        process.on('uncaughtException', (err) => {
            if (err) {
                console.log(err, err.stack);
            }
        });
    }

    initCustomMiddleware() {

        if (process.platform === "win32") {
            require("readline").createInterface({
                input: process.stdin,
                output: process.stdout
            }).on("SIGINT", () => {
                console.log('SIGINT: Closing MongoDB connection');
                database.close();
            });
        }

        process.on('SIGINT', () => {
            console.log('SIGINT: Closing MongoDB connection');
            database.close();
        });
    }


    initDbSeeder() {
        database.open(() => { });
    }

    initRoutes() {

        router.load(app, './controllers');

        // redirect all others to the index (HTML5 history)
        app.all('/*', (req, res) => {
            res.sendFile(__dirname + '/dist/Prospection-Manager/index.html');
        });
    }

}

let server = new Server();
