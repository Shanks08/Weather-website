const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getweather = require("./utils/weather");

const app = express();
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "WEATHER",
		name: "Souryadeep Bhattacharya",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "ABOUT",
		name: "Souryadeep Bhattacharya",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "HELP",
		name: "Souryadeep Bhattacharya",
		helpTitle: "HELP ME",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Address Not Provided",
		});
	}
	getweather(req.query.address, (error, data) => {
		if (error) {
			return res.send({
				error,
			});
		}
		res.send({
			Location: data.Location,
			Weather: data.Weather,
		});
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		errorMessage404: "Help article not found",
		title: "404 Error",
		name: "Souryadeep Bhattacharya",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		errorMessage404: "Page not found",
		title: "404 Error",
		name: "SRD",
	});
});

app.listen(3000, () => {
	console.log("STARTUP");
});
