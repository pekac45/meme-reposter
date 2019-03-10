/* eslint-disable no-unused-vars */
const fetch = require("node-fetch");

const { downloadPicture } = require("./downloadPicture");
const { tweet } = require("./tweet");
let oldMeme = "running 1st time.";

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
			const id = data.data.children[i].data.id;
			let day = {
				title: title,
				rating: rating,
				url: url,
				id: id
			};
			dailyArr.push(day);
		}
		return dailyArr;
	} catch (err) {
		console.error(err);
	}
};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const makeItHappen = async () => {
	// Add if meme.id = previous.meme.id
	// wait 30 minutes
	// else do above
	meme()
		.then(downloadPicture)
		.then(meme)
		.then(tweet);
};

const alreadyPosted = async () => {
	let latestMeme = await meme();
	let memeId = latestMeme[0].id;
	await console.log(
		`It's ${new Date().toLocaleString()} which is a time to make some donuts?`
	);
	await console.log("Let's get to work...");
	await console.log(
		`Current top reddit meme is: ${memeId}. Last posted is: ${oldMeme}`
	);

	if (memeId !== oldMeme) {
		oldMeme = memeId;
		await makeItHappen();
		await sleep(5000);
		await console.log("Done posting.");
		await console.log("Taking a break...");
		await sleep(3600000);
		console.log("60 minutes later");

		alreadyPosted();
	} else {
		let waitingMeme = await meme();
		memeId = waitingMeme[0].id;
		await console.log(
			`This was already posted. Current ID: ${memeId} Old ID: ${oldMeme}`
		);

		await sleep(3600000);
		console.log("60 minutes later");

		alreadyPosted();
	}
};

// Start infinite loop
alreadyPosted();

// makeItHappen();
