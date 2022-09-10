const apiKey = require("./apiKey");
const request = require("request");
const chalk = require("chalk");
const getweather = (address, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(
		address
	)}&units=m`;

	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback("Unable to connect!");
		} else if (!body) {
			callback("Unable to access location!");
		} else if (body.success == false) {
			callback("Unable to find location!");
		} else {
			callback(undefined, {
				Location: `${body.location.name}, ${body.location.country},`,
				Weather: `${body.current.weather_descriptions[0]}.\n
							Temp is ${body.current.temperature}℃, feels like ${body.current.feelslike}℃.\n
							Current Humidity is ${body.current.humidity}.`,
			});
		}
	});
};
module.exports = getweather;
