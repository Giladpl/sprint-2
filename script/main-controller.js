'use strict';

var gElCanvas;
var gCtx;
var gCurrShape = 'text';
var gCurrMeme;
var gCurrImg;

function onInit() {
	console.log('onInit');
	gElCanvas = document.getElementById('canvas');
	gCtx = gElCanvas.getContext('2d');
	gCtx.fillStyle = 'lightskyblue';
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onAddText(ev) {
	ev.preventDefault();
	var txt = document.querySelector('input[name=text]').value;
	updateMemeText(txt);
  gCtx.lineWidth = 2;
	gCtx.strokeStyle = 'black';
	gCtx.fillStyle = gCurrMeme.properties[0].color;
	gCtx.font = `${gCurrMeme.properties[0].size}px ${gCurrMeme.properties[0].font}`;
	gCtx.textAlign = gCurrMeme.properties[0].align;
	gCtx.fillText(gCurrMeme.properties[0].txt, canvas.width / 2, 50);
	gCtx.strokeText(gCurrMeme.properties[0].txt, canvas.width / 2, 50);
}

function onChooseImg(elImg) {
	let img = elImg.src;
	updateMemeImg(img);
	gCurrMeme = getCurrMeme();
	gCurrImg = getCurrImg();
	gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}
