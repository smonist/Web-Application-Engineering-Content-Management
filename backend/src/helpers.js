function getSub(req) {
	if (req) {
		if (req.headers) {
			if (req.headers.authorization) {
				return req.headers.authorization;
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
	isDefined
};
