const fetch = require("node-fetch");
// const dailyLink = "https://www.reddit.com/r/memes/top.json?t=day";

const meme = async () => {
	try {
		const res = await fetch("https://www.reddit.com/r/memes/top.json?t=day");

		if (res.status >= 400) {
			throw new Error("Bad response from server");
		}

		const data = await res.json();
		const arr = [];

		for (let i = 0; i < data.data.children.length; i++) {
			const title = data.data.children[i].data.title;
			const rating = data.data.children[i].data.ups;
			const url = data.data.children[i].data.url;

			let day = {
				title: title,
				rating: rating,
				url: url
			};

			arr.push(day);
		}
		return arr;
	} catch (err) {
		console.error(err);
	}
};

meme().then(console.log);
