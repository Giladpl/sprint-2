'use strict';

// console.log('in main-services');
let gCurrActiveLine = 0;
let gIdx = 1;
const gKeywords = {
	happy: 12,
	'funny puk': 1,
};
const gImgs = [
	{
		id: 1,
		url: 'img/1.jpg',
		keywords: ['trump'],
	},
	{
		id: 2,
		url: 'img/3.jpg',
		keywords: ['dogs'],
	},
	{
		id: 3,
		url: 'img/3.jpg',
		keywords: ['dogs'],
	},
	{
		id: 4,
		url: 'img/4.jpg',
		keywords: ['dogs'],
	},
	{
		id: 5,
		url: 'img/5.jpg',
		keywords: ['dogs'],
	},
	{
		id: 6,
		url: 'img/6.jpg',
		keywords: ['dogs'],
	},
	{
		id: 7,
		url: 'img/7.jpg',
		keywords: ['dogs'],
	},
	{
		id: 8,
		url: 'img/8.jpg',
		keywords: ['dogs'],
	},
	{
		id: 9,
		url: 'img/9.jpg',
		keywords: ['dogs'],
	},
	{
		id: 10,
		url: 'img/10.jpg',
		keywords: ['dogs'],
	},
];

function getImgs() {
	return gImgs;
}

const gMeme = {
	selectedImgId: 5,
	selectedLineIdx: 0,
	nextLineIdx: 0,
	line: [],
};

function getCurrMeme() {
	return gMeme;
}

function createNewLine(txt, font, fillStyle, strokeStyle) {
	gMeme.line.push({
		gIdx,
		txt,
		size: 30,
		align: 'center',
		color: 'red',
		font,
    fillStyle,
    strokeStyle,
		yPos: 50,
	});
	gIdx++;
	gMeme.selectedLineIdx = gMeme.line.length - 1;
	// changeCurrYpos();
}

function switchActiveLine() {
	gMeme.selectedLineIdx++;
	if (gMeme.selectedLineIdx === gMeme.line.length) gMeme.selectedLineIdx = 0;
}

// function getActiveLine() {
// 	return gMeme.line.find((line) => line.idx === gMeme.selectedLineIdx);
// }

function changeCurrYpos() {
	let diff = 200;
	if (gMeme.line[gCurrActiveLine].yPos >= 450)
		gMeme.line[gCurrActiveLine].yPos = 50;
	else gMeme.line[gCurrActiveLine].yPos += diff;
}

function changeFontSize(diff) {
	gMeme.line[gMeme.selectedLineIdx].size += diff;
}

function alignText(direction) {
	gMeme.line[gMeme.selectedLineIdx].align = direction;
}

function moveText(diff) {
	gMeme.line[gMeme.selectedLineIdx].yPos += diff;
}

function deleteLine() {
	gMeme.line.splice(gMeme.selectedLineIdx, 1);

}

function getPicById(idx) {
	return gImgs.find((img) => img.id === idx);
}
