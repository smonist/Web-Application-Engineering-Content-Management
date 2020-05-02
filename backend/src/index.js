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
	clientId: 'E3-s2ZGChD9J2A',
	clientSecret: 'rO7VOkBeeMWl7Row4-hF2DZe2dM',
	username: 'CoolerBamio',
	password: 'JFeqw7pAHK3fZAcP7c83qy6Sx',
});

const schedule = require('node-schedule');

const fetch = require('node-fetch');

const { getSub } = require('./helpers');

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

// TODO Implement function
// Adds subreddit for user
app.options('/api/addSubreddit', cors());
app.post('/api/addSubreddit', async (req, res) => {
	const sub = getSub(req);
	if (!sub) return res.status(401).send('HTTP 401 Unauthorized');

	const body = req.body;
	let pic;
	let description;

	// get subreddit pic and description from api
	try {
		let subreddit = await r.getSubreddit('realEstate');
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

// TODO Implement function
// Deletes subreddit for user
app.options('/api/deleteSubreddit', cors());
app.get('/api/deleteSubreddit', async (req, res) => {
	const sub = getSub(req);
	if (!sub) return res.status(401).send('HTTP 401 Unauthorized');

	const id = req.query.id;
	res.status(200).json({ success: true });
});

// TODO Implement function
// Gets all subreddits
app.options('/api/getSubreddits', cors());
app.get('/api/getSubreddits', async (req, res) => {
	const sub = getSub(req);
	if (!sub) return res.status(401).send('HTTP 401 Unauthorized');

	// Mock data
	res.status(200).json([
		{
			id: '1',
			pic:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/768px-Angular_full_color_logo.svg.png',
			name: 'r/angular',
			desc: 'Front page of angular',
			answers: 3,
			added: new Date(),
			active: false,
		},
	]);
});

app.options('/api/test', cors());
app.get('/api/test', async (req, res) => {
	// Create Tables
	const createUsers = `
	DROP DATABASE users
	`;
	// async/await
	try {
		await pool.query(createUsers);
	} catch (err) {
		console.log(err);
	}

	res.status(200).json({ success: true });
});

app.listen(3000, async () => {
	console.log('Example app listening on port 3000!');

	// Create Tables
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
	} catch (err) {
		console.log(err);
	}

	// Run checkComments routine every minute
	const rule = new schedule.RecurrenceRule();
	schedule.scheduleJob(rule, function () {
		checkComments();
	});
});

// TODO Implement function
function checkComments() {
	console.log('The answer to life, the universe, and everything!');
}

app.options('/api/1', cors());
app.get('/api/1', async (req, res) => {
	let comments = await getCommentsFromSubReddit('realEstate');
	res.status(200).json(comments);;
});

async function getCommentsFromSubReddit(subName) {
	// get keywords from database
	let query = `SELECT keywords FROM subreddits WHERE name = $1`;
	let result;

	try {
		result = await pool.query(query, [ subName ]);
	} catch (err) {
		console.log(err);
	}

	let keywords = [];
	for (var i = 0; i < result.rows.length; i++) {
		keywords.push(result.rows[i].keywords);
	}

	keywords = flattenDeep(keywords);


	// get comments from reddit
	try {
		let subreddit = await r.getSubreddit(subName);
		let comments = await subreddit.getNewComments();

		console.log(comments.length, keywords.length, comments.length * keywords.length)

		for (var i = 0; i < comments.length; i++) {
			for (var u = 0; u < keywords.length; u++) {
				if (comments[i].body.indexOf(keywords[u]) !== -1) {
					console.log("RESPOND TO tHIS POst");
					console.log(comments[i]);
				}
			}
		}



		return comments;
	} catch (err) {
		console.log(err);
		return err;
	}
}

// deep flatten arrays
function flattenDeep(arr1) {
   return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}