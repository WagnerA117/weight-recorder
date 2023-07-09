import express from "express";
import bodyParser from "body-parser";
import routes from "./src/routes";

const app = express();

app.use(bodyParser.json());

//NOTE:
//The bodyParser is
//middleware allowing  HTTP POST requests containing
// URL-encoded form data. This type of data is commonly sent from HTML forms using the application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended: true}));

app.use((_, res, next) => {
	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "*");

	// Request methods you wish to allow
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);

	// Request headers you wish to allow
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", "true");

	// Pass to next layer of middleware
	next();
});

routes(app);

export default app;
