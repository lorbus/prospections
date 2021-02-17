const
    express         = require('express'),
    exphbs          = require('express-handlebars'),
    hbsLayouts      = require('handlebars-layouts'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    errorhandler    = require('errorhandler'),
    csrf            = require('csurf'),
    morgan          = require('morgan'),
    favicon         = require('serve-favicon'),
    router          = require('./routes/router'),
    database        = require('./lib/database'),
    // hbsHelpers      = require('handlebars-helpers'),
    // seeder          = require('./lib/dbSeeder'),
    app             = express(),
    // port            = 4200,
    cors            = require("cors");

class Server {

    constructor() {
        this.initViewEngine();
        this.initExpressMiddleWare();
        this.initCustomMiddleware();
        this.initDbSeeder();
        this.initRoutes();
        this.start();
    }

    start() {
       // app.listen(port, (err) => {
       //     console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
       // });
        app.listen(process.env.PORT || 8080, function (){
            console.log('CORS-enabled API is running on Port:${process.env.PORT || 8080}')
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
        app.use(favicon(__dirname + '/public/assets/images/favicon.ico'));
        app.use(express.static(__dirname + '/public'));
        app.use(morgan('dev'));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(errorhandler());
        app.use(cookieParser());

        var corsOptions = {
          origin: "https://prospections.herokuapp.com/",
          optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        };
        app.use(cors(corsOptions));

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
        database.open(() => {

        });
    }

    initRoutes() {
        router.load(app, './controllers');

        // redirect all others to the index (HTML5 history)
        app.all('/*', (req, res) => {
            res.sendFile(__dirname + '/public/index.html');
        });
    }

}

let server = new Server();
