/* eslint-disable no-unused-vars */
// const { meme } = require("./daily");
const { downloadPicture } = require("./downloadPicture");
const { tweet } = require("./tweet");
let oldMeme;

const fetch = require("node-fetch");

// const dailyLink = "https://www.reddit.com/r/memes/top.json?t=day";
const meme = async () => {
	try {
		const res = await fetch("https://www.reddit.com/r/memes/top.json?t=hour");
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
		console.log("TCL: meme -> dailyArr", dailyArr[0]);
		return dailyArr;
	} catch (err) {
		console.error(err);
	}
	// #
	// #
	// #
	// const reply = [
	// 	{
	// 		title: "It's our hero",
	// 		rating: 11611,
	// 		url: "https://i.redd.it/sq8huxjf6tk21.png",
	// 		id: "ayl70912"
	// 	},
	// 	{
	// 		title: "X:324 Y:75 Z:-678",
	// 		rating: 11888,
	// 		url: "https://i.redd.it/ynn4hwlxbvk21.png",
	// 		id: "ayokxb"
	// 	},
	// 	{
	// 		title: "Press F to pay respect.",
	// 		rating: 11659,
	// 		url: "https://i.redd.it/jx4co1x6muk21.jpg",
	// 		id: "aynlrc"
	// 	},
	// 	{
	// 		title: "And that's a fact",
	// 		rating: 11394,
	// 		url: "https://i.redd.it/otexb3ic5rk21.jpg",
	// 		id: "ayh0e5"
	// 	}
	// ];
	// console.log("TCL: meme -> reply", reply[0]);
	// return reply;
};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const makeItHappen = async () => {
	// Add if meme.id = previous.meme.id
	// wait 30 minutes
	// else do above
	// meme().then(maymay[i].title);
	meme()
		.then(downloadPicture)
		.then(meme)
		.then(tweet);
};

const alreadyPosted = async () => {
	let latestMeme = await meme();
	let memeId = latestMeme[0].id;
	await console.log(`memeId is ${memeId}`);
	await console.log(`oldMeme is ${oldMeme}`);

	// console.log(memeId !== oldMeme);

	if (memeId !== oldMeme) {
		// 	await makeItHappen();

		console.log("tweeting from index.js TRUE PART");
		oldMeme = memeId;
		console.log("Taking a break...");
		makeItHappen();
		await sleep(1800000);
		console.log("30 minutes later");

		console.log(oldMeme, memeId);

		alreadyPosted();
	} else {
		let waitingMeme = await meme();
		memeId = waitingMeme[0].id;
		await console.log(`from false part ${memeId} ${oldMeme}`);

		console.log("waiting from index.js FALSE PART");
		await sleep(1800000);
		console.log("30 minutes later");

		alreadyPosted();
	}
	console.log(`from oustside part ${memeId} ${oldMeme}`);
};

alreadyPosted();

// makeItHappen();

// setInterval(function() {
// 	makeItHappen();
// }, 43200000);
