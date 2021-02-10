'use strict';

var gElCanvas;
var gCtx;
var gCurrShape = 'text';
var gCurrMeme;
var gCurrElImg;

function onInit() {
	console.log('onInit');
	gElCanvas = document.getElementById('canvas');
	gCtx = gElCanvas.getContext('2d');
	gCtx.fillStyle = 'lightskyblue';
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onAddText() {
	gCurrMeme = getCurrMeme();
	var txt = document.querySelector('input[name=text]').value;
	updateMemeText(txt);
	renderCanvas();
}

function renderCanvas() {
	gCtx.drawImage(gCurrElImg, 0, 0, gElCanvas.width, gElCanvas.height);
	renderText();
}

function renderText() {
	gCtx.lineWidth = 2;
	gCtx.strokeStyle = 'black';
	gCtx.fillStyle = gCurrMeme.properties[0].color;
	gCtx.font = `${gCurrMeme.properties[0].size}px ${gCurrMeme.properties[0].font}`;
	gCtx.textAlign = gCurrMeme.properties[0].align;
	gCtx.fillText(gCurrMeme.properties[0].txt, canvas.width / 2, 50);
	gCtx.strokeText(gCurrMeme.properties[0].txt, canvas.width / 2, 50);
}

function onChooseImg(elImg) {
	gCurrElImg = elImg;
	updateMemeImg(gCurrElImg);
	gCurrMeme = getCurrMeme();
	// gCurrElImg = getCurrImg();
	gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function resetCanvas() {
	gCtx.fillStyle = 'lightskyblue';
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
	gCtx = gElCanvas.getContext('2d');
}

function onChangeFontSize(diff) {
	console.log('onChangeFontSize');
	gCurrMeme = getCurrMeme();
	changeFontSize(diff);
	resetCanvas();
	renderCanvas();
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
