function getSub(req) {
	if (req) {
		if (req.headers) {
			if (req.headers.authorization) {
				return req.headers.authorization;
			}
		}
	}
}

module.exports = {
	getSub,
};
