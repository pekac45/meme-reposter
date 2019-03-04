const fetch = require("node-fetch");
const fs = require("fs");

const downloadPicture = async daily => {
	let maymay = daily;
	let i = 0;
	fetch(`${maymay[i].url}`).then(res => {
		const dest = fs.createWriteStream(`${i}.png`);
		res.body.pipe(dest);
	});
};

exports.downloadPicture = downloadPicture;
