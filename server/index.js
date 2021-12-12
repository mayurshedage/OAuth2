require('dotenv').config();

const express = require("express");
const axios = require("axios");
var cors = require("cors");

const PORT = 8080;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const GITHUB_URL = process.env.GITHUB_URL;
const REDIRECT_DOMAIN = process.env.REDIRECT_DOMAIN;

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.get("/oauth/redirect", (req, res) => {
	axios({
		method: "POST",
		url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
		headers: {
			Accept: "application/json",
		},
	}).then((response) => {
		res.redirect(
			`${REDIRECT_DOMAIN}?access_token=${response.data.access_token}`
		);
	});
});

app.listen(PORT, () => {
	console.log(`Listening at port ${PORT}`);
});
