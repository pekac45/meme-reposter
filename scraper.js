const fetch = require("node-fetch");
// const dailyLink = "https://www.reddit.com/r/memes/top.json?t=day";

const meme = async () => {
	try {
		const res = await fetch("https://www.reddit.com/r/memes/top.json?t=day");

		if (res.status >= 400) {
			throw new Error("Bad response from server");
		}

		const data = await res.json();

		const title = data.data.children[0].data.title;
		const rating = data.data.children[0].data.ups;
		const url = data.data.children[0].data.url;

		let day = {
			title: title,
			rating: rating,
			url: url
		};
		return day;
	} catch (err) {
		console.error(err);
	}
};

meme().then(console.log);
