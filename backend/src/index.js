const express = require('express');
const cors = require('cors');

const helmet = require('helmet');
const jwt = require('jsonwebtoken');

// DB
const { Client } = require('pg');
const client = new Client();

const app = express();
app.use(helmet());
app.use(cors());

app.options('/api/login', cors());
app.get('/api/login', (req, res) => {
	let token = '';
	if (req.headers.authorization)
		token = req.headers.authorization.split(' ')[1];

	jwt.verify(
		token,
		`-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlQ6nDgkPC2UO78QHQKMOiMq21UMFtLKfVNTqbEemGN/3XdfiXLnVCZqLnDUZIR9mn2jE9rgQlAcpOJQIp8+J0KosKtdAXLzkluldMZMz0cZE1uVKcOHsTVT+3skPCjSwRT+XrwRrbGEXF4jJmeztLYYkJYMrT5lx2nt5t4UylT6LolqJsguXg6GIXeC1Almr0bYEsFKKFfRc48YCfwgpAVSJH5NwzurIPXf4dik35yiidPR+SboE9WR3nwTxrfvw2rnP/6DQkTmisgIzAQBVAUepz94drq4UvycdSaGD8kxfzKYAyVRTf6XG/Zxaiu+khmhRLMzZdoF6xtsy8+LMtQIDAQAB\n-----END PUBLIC KEY-----`,
		{
			audience: 'waecm',
			issuer: 'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm',
			algorithms: ['RS256'],
		},
		(err, decoded) => {
			if (err) {
				console.log('Error while verify');
				console.log(err);

				res.status(401);
				res.send('HTTP 401 Unauthorized');
				return;
			}

			console.log('Token valid');
			console.log(decoded);
			res.status(200).json({ success: true });
			return;
		}
	);
});

app.options('/api/test', cors());
app.get('/api/test', async (req, res) => {
	try {
		await client.connect();
		const temp = await client.query('SELECT $1::text as message', [
			'Hello world!',
		]);
		console.log(temp.rows[0].message); 
		await client.end();
	} catch (err) {
		console.log(err);
	}

	res.status(200).json({ success: true });
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
