/* eslint-disable no-unused-vars */
const fs = require("fs");
const Twit = require("twit");
const path = require("path");
// Uncomment if running localy, leave commented if on heroku
// const config = require("./config");

const config = {
	consumer_key: "process.env.BOT_CONSUMER_KEY",
	consumer_secret: "process.env.BOT_CONSUMER_SECRET",
	access_token: "process.env.BOT_ACCESS_TOKEN",
	access_token_secret: "process.env.BOT_ACCESS_TOKEN_SECRET"
};

const tweet = daily => {
	let T = new Twit(config);
	let maymay = daily;
	let i = 0;

	console.log(`${maymay[i].title} ${maymay[i].url}`);

	console.log("Opening an image...");
	let imagePath = path.join(__dirname, i + ".png"),
		b64content = fs.readFileSync(imagePath, { encoding: "base64" });

	console.log("Uploading an image...");

	T.post("media/upload", { media_data: b64content }, function(err, data, response) {
		if (err) {
			console.log("ERROR:");
			console.log(err);
		} else {
			console.log("Image uploaded!");
			console.log("Now tweeting it...");

			// TWEET
			T.post(
				"statuses/update",
				{
					status: `${maymay[0].title} #memes #meme #funny #dank`,
					media_ids: new Array(data.media_id_string)
				},
				function(err, data, response) {
					if (err) {
						console.log("ERROR:");
						console.log(err);
					} else {
						console.log("Posted an image!");
						// fs.unlink(imagePath, function(err) {
						// 	if (err) {
						// 		console.log(`ERROR: unable to delete image ${imagePath}`);
						// 	} else {
						// 		console.log(`image ${imagePath} was deleted`);
						// 	}
						// });
					}
				}
			);
		}
	});
};

exports.tweet = tweet;
