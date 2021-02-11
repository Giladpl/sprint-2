'use strict';

var gElCanvas;
var gCtx;
var gCurrMeme;
var gCurrElImg;

function onInit() {
	console.log('onInit');
	renderGallery();
	gElCanvas = document.getElementById('canvas');
	gCtx = gElCanvas.getContext('2d');
	gCtx.fillStyle = 'lightskyblue';
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function renderGallery() {
	let imgs = getImgs();
	let htmls = imgs.map(
		(img, i) =>
			`<img data-id="${
				i + 1
			}" onclick="onChooseImg(this)" class="img-option btn-pointer" src="imgs/meme-imgs (square)/${
				i + 1
			}.jpg">`
	);
	document.querySelector('.images-content').innerHTML = htmls.join('');
}

function onAddText() {
	let CurrMeme = getCurrMeme();
	var txt = document.querySelector('input[name=text]').value;
	createNewLine(txt);
	renderCanvas();
}

function renderCanvas() {
	gCtx.drawImage(gCurrElImg, 0, 0, gElCanvas.width, gElCanvas.height);
	renderText();
}

function renderText() {
	let currMeme = getCurrMeme();
	currMeme.line.forEach((line) => {
		gCtx.lineWidth = 2;
		gCtx.strokeStyle = 'black';
		gCtx.fillStyle = line.color;
		gCtx.font = `${line.size}px ${line.font}`;
		gCtx.textAlign = line.align;
		gCtx.fillText(line.txt, canvas.width / 2, line.yPos);
		gCtx.strokeText(line.txt, canvas.width / 2, line.yPos);
	});
}

function onChooseImg(elImg) {
	document.querySelector('.canvas-editor-container').classList.toggle('hide');
	document.querySelector('.images-container').classList.toggle('hide');
  document.querySelector('.about').classList.toggle('hide');
	let currPicIdx = +elImg.dataset.id;
	let currPic = getPicById(currPicIdx);
	gCurrElImg = elImg;
	gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function resetCanvas() {
	gCtx.fillStyle = 'lightskyblue';
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
	gCtx = gElCanvas.getContext('2d');
}

function onChangeFontSize(diff) {
	// console.log('onChangeFontSize');
	gCurrMeme = getCurrMeme();
	changeFontSize(diff);
	resetCanvas();
	renderCanvas();
}

function onSwitchRow() {
	// console.log('onSwitchRow');
  switchActiveLine()

}

function onAlignLeft() {
	console.log('onAlignLeft');
}

function onAlignCenter() {
	console.log('onAlignCenter');
}

function onAlignRight() {
	console.log('onAlignRight');
}

function onMoveText(diff) {
	// console.log('onMoveText');
	moveText(diff);
	resetCanvas();
	renderCanvas();
}

function drawRectBorder(text, x, y) {
  gCtx.beginPath()
  gCtx.rect(x, y, 150, 150)
  gCtx.fillStyle = 'orange'
  // gCtx.fill()
  let width = gCtx.measureText(text);
  gCtx.fillRect(x, y, 150, 150)
  gCtx.strokeStyle = 'black'
  gCtx.stroke()
}
