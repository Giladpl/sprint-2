'use strict';

var gElCanvas;
var gCtx;
var gCurrMeme;
var gCurrElImg;
var gActiveLine;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onInit() {
	console.log('onInit');
	renderGallery();
	gElCanvas = document.getElementById('canvas');
	gCtx = gElCanvas.getContext('2d');
	gCtx.fillStyle = 'lightskyblue';
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
	addListeners();
}

function addListeners() {
	addMouseListeners();
	addTouchListeners();
}

function addMouseListeners() {
	gElCanvas.addEventListener('mousemove', onMove);

	gElCanvas.addEventListener('mousedown', onDown);

	gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
	gElCanvas.addEventListener('touchmove', onMove);

	gElCanvas.addEventListener('touchstart', onDown);

	gElCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
	const pos = getEvPos(ev);
	gActiveLine = isLineClicked(pos);	
	if (!gActiveLine) return;
	gActiveLine.isDragging = true;
	gStartPos = pos;
	document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
	if (!gActiveLine) return;
	if (gActiveLine.isDragging) {
		const pos = getEvPos(ev);
		
		const distanceX = pos.x - gStartPos.x;
		const distanceY = pos.y - gStartPos.y;
	
		gActiveLine.pos.x += distanceX;
		gActiveLine.pos.y += distanceY;

		gStartPos = pos;
		document.body.style.cursor = 'grabbing';
		renderCanvas();
	}
}

function onUp() {
	if (!gActiveLine) return;
	gActiveLine.isDragging = false;
	gActiveLine = null;
	document.body.style.cursor = 'auto';

}

function getEvPos(ev) {
	var pos = {
		x: ev.offsetX,
		y: ev.offsetY,
	};
	// if (gTouchEvs.includes(ev.type)) {
	// 	ev.preventDefault();
	// 	ev = ev.changedTouches[0];
	// 	pos = {
	// 		x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
	// 		y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
	// 	};
	// }
	return pos;
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
	var txt = document.querySelector('input[name=text]').value;
	var {
		width,
		actualBoundingBoxLeft: midToLeftW,
		actualBoundingBoxRight: midToRightW,
		actualBoundingBoxAscent: height,
	} = gCtx.measureText(txt);
	var font = document.querySelector('.select-font').value;
	var fillStyle = document.querySelector('.color-picker-fill').value;
	var strokeStyle = document.querySelector('.color-picker-stroke').value;
	createNewLine(
		txt,
		font,
		fillStyle,
		strokeStyle,
		width,
		midToLeftW,
		midToRightW,
		height
	);
	document.querySelector('input[name=text]').value = '';
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
		gCtx.strokeStyle = line.strokeStyle;
		gCtx.fillStyle = line.fillStyle;
		gCtx.font = `${line.size}px ${line.font}`;
		gCtx.textAlign = line.align;
		gCtx.fillText(line.txt, line.pos.x, line.pos.y);
		gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
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
	switchActiveLine();
}

function onAlign(direction) {
	// console.log(direction);
	alignText(direction);
	resetCanvas();
	renderCanvas();
}

function onMoveText(diff) {
	// console.log('onMoveText');
	moveText(diff);
	resetCanvas();
	renderCanvas();
}

function onDeleteLine() {
	deleteLine();
	resetCanvas();
	renderCanvas();
}

function drawRectBorder(text, x, y) {
	gCtx.beginPath();
	gCtx.rect(x, y, 150, 150);
	gCtx.fillStyle = 'orange';
	// gCtx.fill()
	let width = gCtx.measureText(text);
	gCtx.fillRect(x, y, 150, 150);
	gCtx.strokeStyle = 'black';
	gCtx.stroke();
}

// TODO- need to allow user to see also dynamic changes with fontsize/algin
function onShowText(string) {
	var font = document.querySelector('.select-font').value;
	var fontSize = 30;
	var fillStyle = document.querySelector('.color-picker-fill').value;
	var strokeStyle = document.querySelector('.color-picker-stroke').value;
	gCtx.lineWidth = 2;
	gCtx.strokeStyle = strokeStyle;
	gCtx.fillStyle = fillStyle;
	gCtx.font = `${fontSize}px ${font}`;
	gCtx.textAlign = 'center';
	gCtx.fillRect(0, 0, canvas.width, canvas.height);
	gCtx.drawImage(gCurrElImg, 0, 0, gElCanvas.width, gElCanvas.height);
	gCtx.fillText(string, canvas.width / 2, canvas.height / 8);
	gCtx.strokeText(string, canvas.width / 2, canvas.height / 8);
	renderText();
}
