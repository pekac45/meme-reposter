/* eslint-disable no-unused-vars */
const { meme } = require("./daily");
const { downloadPicture } = require("./downloadPicture");
const { tweet } = require("./tweet");

const makeItHappen = async () => {
	// Add if meme.id = previous.meme.id 
		// wait 30 minutes
	// else do above
	meme()
		.then(downloadPicture)
		.then(meme)
		.then(tweet);
};

// setInterval(function() {
// 	makeItHappen();
// }, 43200000);

makeItHappen();
