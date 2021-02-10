'use strict';

// console.log('in main-services');

const gKeywords = { happy: 12, 'funny puk': 1 };
const gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['trump'] }];
const gMeme = {
	idx: 1,
	selectedImgId: 5,
	selectedLineIdx: 0,
	properties: [
		{
			txt: 'Hola',
			img: 'img/1.jpg',
			size: 30,
			align: 'center',
			color: 'red',
			font: 'Impact',
		},
	],
	linesPos: 50,
};

function getCurrMeme() {
	return gMeme;
}
// function getCurrImg() {
// 	return gImgs[0];
// }

function updateMemeText(txt) {
	gMeme.properties[0].txt = txt;
}

function updateMemeImg(img) {
	gMeme.properties[0].img = img;
}

function changeCurrLinePos() {
	let diff = 200;
	if (gMeme.linesPos >= 450) return (gMeme.linesPos = 50);
	return (gMeme.linesPos += diff);
}

function changeFontSize(diff) {
	gMeme.properties[0].size += diff;
}
