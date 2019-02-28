/* eslint-disable no-unused-vars */
const fetch = require("node-fetch");
const Twit = require("twit");
const fs = require("fs");
const path = require("path");
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
	let i = 0;

	console.log(`${maymay[i].title} ${maymay[i].url} #memes #meme #funny #dank`);

	console.log("Opening an image...");
	let imagePath = path.join(__dirname, i + ".png"),
		b64content = fs.readFileSync(imagePath, { encoding: "base64" });

	console.log("Uploading an image...");

	T.post("media/upload", { media_data: b64content }, function(
		err,
		data,
		response
	) {
		if (err) {
			console.log("ERROR:");
			console.log(err);
		} else {
			console.log("Image uploaded!");
			console.log("Now tweeting it...");

			T.post(
				"statuses/update",
				{ status: maymay[0].title, media_ids: new Array(data.media_id_string) },
				function(err, data, response) {
					if (err) {
						console.log("ERROR:");
						console.log(err);
					} else {
						console.log("Posted an image!");
						fs.unlink(imagePath, function(err) {
							if (err) {
								console.log(`ERROR: unable to delete image ${imagePath}`);
							} else {
								console.log(`image ${imagePath} was deleted`);
							}
						});
					}
				}
			);
		}
	});
};

const downloadPicture = async daily => {
	let maymay = daily;
	let i = 0;
	fetch(`${maymay[i].url}`).then(res => {
		const dest = fs.createWriteStream(`${i}.png`);
		res.body.pipe(dest);
	});
};

meme()
	.then(downloadPicture)
	.then(meme)
	.then(Tweet);
