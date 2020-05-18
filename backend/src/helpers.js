const jwt = require('jsonwebtoken');

function getSub(req) {
	if (req) {
		if (req.headers) {
			if (req.headers.authorization) {
				return jwt.verify(
					req.headers.authorization,
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
							return;
						}
						console.log(decoded);

						return decoded.sub;
					}
				);
			}
		}
	}
}

function isDefined(query) {
	if (typeof query !== 'undefined' && query !== null) {
		return true;
	} else {
		return false;
	}
}

module.exports = {
	getSub,
	isDefined,
};
