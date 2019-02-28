/* eslint-disable no-unused-vars */
const fetch = require("node-fetch");
const Twit = require("twit");
const config = require("./config");
// const dailyLink = "https://www.reddit.com/r/memes/top.json?t=day";

const meme = async () => {
	try {
		const res = await fetch("https://www.reddit.com/r/memes/top.json?t=day");

		if (res.status >= 400) {
			throw new Error("Bad response from server");
		}

		const data = await res.json();

		const dailyArr = [];

		for (let i = 0; i < data.data.children.length; i++) {
			const title = data.data.children[i].data.title;
			const rating = data.data.children[i].data.ups;
			const url = data.data.children[i].data.url;

			let day = {
				title: title,
				rating: rating,
				url: url
			};

			dailyArr.push(day);
		}
		return dailyArr;
	} catch (err) {
		console.error(err);
	}
};

const Tweet = daily => {
	let T = new Twit(config);
	let maymay = daily;
	T.post(
		"statuses/update",
		{ status: `${maymay[0].title} ${maymay[0].url} #memes #meme #funny #dank` },
		function(err, data, _response) {
			console.log(data);
			console.log(err);
			// console.log(response);
		}
	);
};

meme().then(Tweet);
