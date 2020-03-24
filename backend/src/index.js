const express = require('express');
const cors = require('cors');

const helmet = require('helmet');
const jwt = require('jsonwebtoken');


const app = express();
app.use(helmet());
app.use(cors());


app.options('/api/login', cors());
app.get('/api/login', function(req, res) {

	let token = '';
	if (req.headers.authorization)
		token = req.headers.authorization.split(' ')[1];
	
	let nonce = '';
	if (req.headers.nonce);
		nonce = req.headers.nonce;

	jwt.verify(token, nonce, {
		audience: 'waecm',
		issuer: 'https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm'
	}, (err, decoded) => {
		console.log(err, decoded);
	});

	/*verifier.verify(token, nonce, (error, payload) => {
		if (error) {
			console.log(error);

			res.status(401);
			res.send('HTTP 401 Unauthorized');
			return;
		}
		console.log(payload);

		res.status(200);
		res.send('HTTP 200 Ok');
	});*/
});

app.get('/api/logout', function(req, res) {

});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
