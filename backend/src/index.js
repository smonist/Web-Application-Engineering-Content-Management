const express = require('express');
const cors = require('cors');
const IdTokenVerifier = require('idtoken-verifier');

const app = express();
app.use(cors());

const verifier = new IdTokenVerifier({
	issuer: 'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm',
	audience: 'waecm'
});

app.options('/api/login', cors());
app.get('/api/login', function(req, res) {
	const token = req.headers.authorization.split(' ')[1];
	const nonce = req.headers.nonce;

	verifier.verify(token, nonce, (error, payload) => {
		if (error) {
			console.log(error);

			res.status(401);
			res.send('HTTP 401 Unauthorized');
			return;
		}
		console.log(payload);

		res.status(200);
		res.send('HTTP 200 Ok');
	});
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
