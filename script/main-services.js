'use strict';

// console.log('in main-services');
let gCurrActiveLine = 0;
let gIdx = 0;
const gKeywords = {
	happy: 12,
	'funny puk': 1,
};
const gImgs = [
	{
		id: 1,
		url: 'img/1.jpg',
		keywords: ['trump','politics', 'all'],
	},
	{
		id: 2,
		url: 'img/2.jpg',
		keywords: ['dog', 'dogs', 'all'],
	},
	{
		id: 3,
		url: 'img/3.jpg',
		keywords: ['baby', 'babies', 'dog', 'dogs', 'all'],
	},
	{
		id: 4,
		url: 'img/4.jpg',
		keywords: ['cat', 'cats', 'all'],
	},
	{
		id: 5,
		url: 'img/5.jpg',
		keywords: ['baby', 'funny', 'all'],
	},
	{
		id: 6,
		url: 'img/6.jpg',
		keywords: ['hair','movie', 'movies', 'funny','all'],
	},
	{
		id: 7,
		url: 'img/7.jpg',
		keywords: ['funny', 'baby','all'],
	},
	{
		id: 8,
		url: 'img/8.jpg',
		keywords: ['funny', 'hat','movie', 'movies','all'],
	},
	{
		id: 9,
		url: 'img/9.jpg',
		keywords: ['baby', 'funny','all'],
	},
	{
		id: 10,
		url: 'img/9.jpg',
		keywords: ['obama', 'politics','all'],
	},
	{
		id: 11,
		url: 'img/11.jpg',
		keywords: ['kiss', 'all'],
	},
	{
		id: 12,
		url: 'img/12.jpg',
		keywords: ['all'],
	},
	{
		id: 13,
		url: 'img/13.jpg',
		keywords: ['movie','movies', 'cheers', 'all'],
	},
	{
		id: 14,
		url: 'img/14.jpg',
		keywords: ['movie','movies','all'],
	},
	{
		id: 15,
		url: 'img/15.jpg',
		keywords: ['movie','movies','all'],
	},
	{
		id: 16,
		url: 'img/16.jpg',
		keywords: ['movies', 'movie', 'all'],
	},
	{
		id: 17,
		url: 'img/17.jpg',
		keywords: ['politics', 'all'],
	},
	{
		id: 18,
		url: 'img/18.jpg',
		keywords: ['movie', 'movies', 'all'],
	},
];

function getImgs(keyword = 'all') {
	const filteredImgs = gImgs.filter(img => img.keywords.includes(keyword))
	return filteredImgs;
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

function createNewLine(
	txt,
	font,
	fillStyle,
	strokeStyle,
	width,
	midToLeftW,
	midToRightW,
	height
) {
	gMeme.line.push({
		gIdx,
		txt,
		size: 30,
		align: 'center',
		color: 'red',
		font,
		fillStyle,
		strokeStyle,
		pos: {
			x: gElCanvas.width / 2,
			y: gElCanvas.height / 8,
		},
		width,
		midToLeftW,
		midToRightW,
		height,
		isDragging: false,
	});
	gIdx++;
	gMeme.selectedLineIdx = gMeme.line.length - 1;
	// changeCurrpos.y();
}

function switchActiveLine() {
	gMeme.selectedLineIdx++;
	if (gMeme.selectedLineIdx === gMeme.line.length) gMeme.selectedLineIdx = 0;
}

function getActiveLine() {
	return gMeme.line.find((line) => line.gIdx === gMeme.selectedLineIdx);
}


function getPicById(idx) {
	return gImgs.find((img) => img.id === idx);
}

// TODO- combine the below 4 functions into one updateMemeLine function

function changeFontSize(diff) {
	gMeme.line[gMeme.selectedLineIdx].size += diff;
}

function alignText(direction) {
	gMeme.line[gMeme.selectedLineIdx].align = direction;
}

function moveText(diff) {
	gMeme.line[gMeme.selectedLineIdx].pos.y += diff;
}

function deleteLine() {
	gMeme.line.splice(gMeme.selectedLineIdx, 1);
}

function isLineClicked(clickedPos) {
	// console.log(clickedPos);
	return gMeme.line.find((currLine) => {
		let minX = currLine.pos.x - currLine.midToLeftW;
		let maxX = currLine.pos.x + currLine.midToRightW;
		let minY = currLine.pos.y - currLine.height / 2;
		let maxY = currLine.pos.y + currLine.height / 2;

		if (
			clickedPos.x > minX &&
			clickedPos.x < maxX &&
			clickedPos.y < maxY &&
			clickedPos.y > minY
			)

			return currLine;
		});
	}
	
function changeStroke(color) {
	gMeme.line[gMeme.selectedLineIdx].strokeStyle = color;
}

function changeFill(color) {
	gMeme.line[gMeme.selectedLineIdx].fillStyle = color;
}

function changeFont(font) {
	gMeme.line[gMeme.selectedLineIdx].font = font;
}

// TODO to understand why the below doesn't work
// clickedPos.x > (currLine.pos.x - currLine.midToLeftW) &&
// 			clickedPos.x < (currLine.pos.x + currLine.midToRightW) &&
// 			clickedPos.y < (currLine.pos.y + (currLine.height / 2)) &&
// 			clickedPos.y > (currLine.pos.y - (currLine.height / 2))

// function changeProperty(value, property) {
	// 	gMeme.line[gMeme.selectedLineIdx][property] = value;
	// }
	
	// TODO- Build a func to place new lines on different yPos
	// function getPosY() {
	
	// }