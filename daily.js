// eslint-disable-next-line no-unused-vars
const fetch = require("node-fetch");

// const dailyLink = "https://www.reddit.com/r/memes/top.json?t=day";
const meme = async () => {
	// try {
	// 	const res = await fetch("https://www.reddit.com/r/memes/top.json?t=day");
	// 	if (res.status >= 400) {
	// 		throw new Error("Bad response from server");
	// 	}
	// 	const data = await res.json();
	// 	const dailyArr = [];
	// 	for (let i = 0; i < data.data.children.length; i++) {
	// 		const title = data.data.children[i].data.title;
	// 		const rating = data.data.children[i].data.ups;
	// 		const url = data.data.children[i].data.url;
	// 		const id = data.data.children[i].data.id;
	// 		let day = {
	// 			title: title,
	// 			rating: rating,
	// 			url: url,
	// 			id: id
	// 		};
	// 		dailyArr.push(day);
	// 	}
	// 	console.log("TCL: meme -> dailyArr", dailyArr[0]);
	// 	return dailyArr;
	// } catch (err) {
	// 	console.error(err);
	// }
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

// meme();

exports.meme = meme;
