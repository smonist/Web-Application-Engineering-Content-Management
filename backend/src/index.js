const express = require('express');
const cors = require('cors');

const helmet = require('helmet');
const jwt = require('jsonwebtoken');

// DB
const { Pool } = require('pg');
const pool = new Pool({
	user: 'admin',
	host: 'localhost',
	database: 'app-dbs',
	password: 'admin',
});

// Reddit APi
const snoowrap = require('snoowrap');
const r = new snoowrap({
	userAgent: 'bot from /u/CoolerBamio',
	clientId: process.env.REDDIT_CLIENT_ID,
	clientSecret: process.env.REDDIT_CLIENT_SECRET,
	username: process.env.REDDIT_USERNAME,
	password: process.env.REDDIT_PASSWORD,
});

const schedule = require('node-schedule');

const fetch = require('node-fetch');

const { getSub, isDefined } = require('./helpers');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Checks if subreddit exists
app.options('/api/subredditValid', cors());
app.get('/api/subredditValid', async (req, res) => {
	const subreddit = req.query.subreddit;
	const temp = await fetch(`https://www.reddit.com/r/${subreddit}`);

	if (temp.status === 200) {
		res.status(200).json(true);
	} else {
		res.status(200).json(false);
	}
	return;
});

// Adds subreddit for user
app.options('/api/addSubreddit', cors());
app.post('/api/addSubreddit', async (req, res) => {
	const sub = getSub(req);
	if (!sub) return res.status(401).send('HTTP 401 Unauthorized');

	// input "validation"
	if (!isDefined(req.body) || !isDefined(req.body.name)) {
		return res.status(400).send('HTTP 400 Bad Request');
	}

	const body = req.body;
	let pic;
	let description;

	// get subreddit pic and description from api
	try {
		let subreddit = await r.getSubreddit(body.name);
		subreddit = await subreddit.fetch();

		pic = subreddit.community_icon;
		description = subreddit.public_description;
	} catch (err) {
		console.log(err);
	}

	const query = `
		INSERT INTO subreddits(sub, pic, name, description, answers, added, active, answer, keywords) VALUES($1, $2, $3, $4, 0, $5, $6, $7, $8) RETURNING *
	`;

	const values = [
		sub,
		pic,
		body.name,
		description,
		Date.now(),
		body.active,
		body.answer,
		body.keywords,
	];

	try {
		const res = await pool.query(query, values);
		console.log(res.rows[0]);
	} catch (err) {
		console.log(err.stack);
	}

	res.status(200).json({ success: true });
});

app.options('/api/updateSubreddit', cors());
app.post('/api/updateSubreddit', async (req, res) => {
	const sub = getSub(req);

	if (!sub) return res.status(401).send('HTTP 401 Unauthorized');

	// input "validation"
	if (
		!isDefined(req.body) ||
		!isDefined(req.body.keywords) ||
		!isDefined(req.body.active) ||
		!isDefined(req.body.answer) ||
		!isDefined(req.body.id)
	) {
		return res.status(400).send('HTTP 400 Bad Request');
	}

	const body = req.body;

	let query = `
		UPDATE subreddits
		SET answer = $1, keywords = $2, active = $3
		WHERE id = $4;
	`;

	let values = [body.answer, body.keywords, body.active, body.id];

	try {
		await pool.query(query, values);
		res.status(200).json({ success: true });
	} catch (err) {
		console.log(err.stack);
		res.status(404).send('HTTP 404 Not found');
	}
});

// Deletes subreddit for user
app.options('/api/deleteSubreddit', cors());
app.get('/api/deleteSubreddit', async (req, res) => {
	const sub = getSub(req);
	if (!sub) return res.status(401).send('HTTP 401 Unauthorized');

	// input "validation"
	if (!isDefined(req.query) || !isDefined(req.query.id)) {
		return res.status(400).send('HTTP 400 Bad Request');
	}

	const id = parseInt(req.query.id);

	if (isNaN(parseInt(id))) return res.status(400).send('HTTP 400 Bad Request');

	const query = `
		DELETE FROM subreddits WHERE id = $1
	`;

	const values = [id];

	try {
		await pool.query(query, values);
		res.status(200).json({ success: true });
	} catch (err) {
		console.log(err);
		res.status(200).json([]);
	}
});

// Gets all subreddits
app.options('/api/getSubreddits', cors());
app.get('/api/getSubreddits', async (req, res) => {
	const sub = getSub(req);
	if (!sub) return res.status(401).send('HTTP 401 Unauthorized');

	const query = `
		SELECT * FROM subreddits WHERE sub = $1
	`;

	const values = [sub];

	try {
		const ret = await pool.query(query, values);
		console.log(ret.rows);
		res.status(200).json(ret.rows);
	} catch (err) {
		console.log(err);
		res.status(404).send('HTTP 404 Not found');
	}
});

app.listen(3000, async () => {
	console.log('Example app listening on port 3000!');

	// Create User Table
	const createUsers = `
	CREATE TABLE IF NOT EXISTS subreddits (
		id SERIAL PRIMARY KEY,
		sub varchar NOT NULL,
		pic varchar NOT NULL,
		name varchar NOT NULL,
		description varchar NOT NULL,
		answers integer NOT NULL,
		answer varchar NOT NULL,
		keywords varchar[] NOT NULL,
		added bigint NOT NULL,
		active BOOLEAN NOT NULL
	);
	`;

	try {
		await pool.query(createUsers);
		console.log('created user table');
	} catch (err) {
		console.log(err);
	}

	// create comments table
	const createComments = `
	CREATE TABLE IF NOT EXISTS comments (
		"comment_id" VARCHAR NOT NULL,
		"subreddit" VARCHAR NOT NULL,
		"timestamp" TIMESTAMP NOT NULL DEFAULT Now(),
		PRIMARY KEY ("comment_id")
	)
	`;

	try {
		await pool.query(createComments);
		console.log('created comments table');
	} catch (err) {
		console.log(err);
	}

	// Run checkComments routine every minute
	const rule = new schedule.RecurrenceRule();
	schedule.scheduleJob(rule, function () {
		checkComments();
	});
});

async function checkComments() {
	console.log('The answer to life, the universe, and everything!');

	// get subreddits from database
	let query = `SELECT name FROM subreddits WHERE active = $1`;
	let result;

	try {
		result = await pool.query(query, [true]);
	} catch (err) {
		console.log(err);
	}

	let hit;
	for (var i = 0; i < result.rows.length; i++) {
		hit = await replyToAllNewComments(result.rows[i].name);

		if (hit !== null) return hit;
	}

	return hit;
}

/*app.options('/api/1', cors());
app.get('/api/1', async (req, res) => {
	let comments = await getCommentsFromSubReddit('realEstate');
	res.status(200).json(comments);
});
*/

async function replyToAllNewComments(subName) {
	// get keywords from database
	let query = `SELECT keywords, answer FROM subreddits WHERE name = $1 AND active = $2`;
	let result;

	try {
		result = await pool.query(query, [ subName, true ]);
	} catch (err) {
		console.log(err);
	}

	let keywords = [];
	let answers = [];
	for (var i = 0; i < result.rows.length; i++) {
		for (var u = 0; u < result.rows[i].keywords.length; u++) {
			keywords.push(result.rows[i].keywords[u].toLowerCase());
			answers.push(result.rows[i].answer);
		}
	}

	console.log(keywords, answers)

	// get comments from reddit
	try {
		let subreddit = await r.getSubreddit(subName);
		let comments = await subreddit.getNewComments();
		let hit = null;

		for (var i = 0; i < comments.length; i++) {
			for (var u = 0; u < keywords.length; u++) {
				// check for: keywords, group name, own posts, already hit
				if ((comments[i].body.toLowerCase().indexOf(keywords[u]) !== -1) && 
					(comments[i].body.toLowerCase().indexOf(process.env.WAECM_GROUP_NAME) !== -1) &&
				(comments[i].author.name !== "CoolerBamio") && (hit === null)) {
					// check if comment already exists
					let query = `SELECT * FROM comments WHERE comment_id = $1`;
					let result;

					try {
						result = await pool.query(query, [ comments[i].id ]);
						console.log(JSON.stringify(result.rows));
					} catch (err) {
						console.log(err);
					}

					// if not, reply
					if (result.rows.length === 0) {
						console.log("RESPOND TO tHIS POst", comments[i].id);
						hit = comments[i];

						comments[i].reply(answers[u]);

						// save comment to database
						query = `
							INSERT INTO comments(comment_id, subreddit) VALUES($1, $2) RETURNING *
						`;
						try {
							result = await pool.query(query, [ comments[i].id, subName ]);
							console.log(result.rows[0]);
						} catch (err) {
							console.log(err.stack);
						}
					} else {
						console.log("comment to this post already exists", comments[i].id);
					}
				}
			}
		}

		return hit;
	} catch (err) {
		console.log(err);
		return err;
	}
}

// deep flatten arrays
function flattenDeep(arr1) {
   return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}