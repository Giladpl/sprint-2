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
	window.addEventListener('resize', () => {
		resizeCanvas();
		renderCanvas();
	});
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
	var currMeme = getCurrMeme();
	if (!gActiveLine) return;
	currMeme.selectedLineIdx = gActiveLine.gIdx;
	gActiveLine.isDragging = true;
	gStartPos = pos;
	document.body.style.cursor = 'grabbing';
}

//TODO drag and drop works only on PC and not on phone + having problems when narrowing through dev-tools
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
		drawTextBorder();
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
	if (gTouchEvs.includes(ev.type)) {
		ev.preventDefault();
		ev = ev.changedTouches[0];
		pos = {
			x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
			y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
		};
	}
	return pos;
}

function onFilterSearch(ev, elSearch) {
	ev.preventDefault();
	const searchWord = elSearch.value;
	const filteredImgs = getImgs(searchWord);
	if (!searchWord) {
		renderGallery();
		return;
	}
	renderGallery(filteredImgs);
}

function renderGallery(filteredImgs) {
	// console.log(filteredImgs);
	const imgs = filteredImgs || getImgs();
	let htmls = imgs.map(
		(img, i) =>
			`<img data-id="${img.id}" onclick="onChooseImg(this)" class="img-option btn-pointer" src="imgs/meme-imgs (square)/${img.id}.jpg">`
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
	drawTextBorder();

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
	const txt = changeFontSize(diff);
	const {
		width,
		actualBoundingBoxLeft: midToLeftW,
		actualBoundingBoxRight: midToRightW,
		actualBoundingBoxAscent: height,
	} = gCtx.measureText(txt);
	updateLineModel(width, midToLeftW, midToRightW, height);
	renderCanvas();
	drawTextBorder()

}

function updateLineCanvas() {
	const currLine = getActiveLine();
	
	document.querySelector('input[name=text]').value = currLine.txt;

// 	updateLineModel(txt);
}

function onSwitchRow() {
	// console.log('onSwitchRow');
	renderCanvas();
	switchActiveLine();
	drawTextBorder();
	// updateLineCanvas() 
}
//TODO- when alining needs to adjust the new location of the line in order to be able to still drag and drop
function onAlign(direction) {
	// console.log(direction);
	alignText(direction);
	renderCanvas();
}

function onMoveText(diff) {
	// console.log('onMoveText');
	moveText(diff);
	renderCanvas();
	drawTextBorder();
}

function onDeleteLine() {
	deleteLine();
	renderCanvas();
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

function onChangeFill(elColor) {
	let color = elColor.value;
	changeFill(color);
	renderCanvas();
	drawTextBorder()

}

function onChangeStroke(elColor) {
	let color = elColor.value;
	changeStroke(color);
	renderCanvas();
	drawTextBorder()

}

function onChangeFont(elFont) {
	let font = elFont.value;
	changeFont(font);
	renderCanvas();
}

function onDownloadImg(elLink) {
	var imgContent = gElCanvas.toDataURL('image/jpeg');
	elLink.href = imgContent;
}
//TODO- once shared, needs to re-change innerHtml of btn in order to allow user to re-post without refreshing the page.
function onUploadImg(elForm, ev) {
	ev.preventDefault();
	document.getElementById('imgData').value = gElCanvas.toDataURL('image/jpeg');

	function onSuccess(uploadedImgUrl) {
		uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
		document.querySelector('.share-container').innerHTML = `
      <a class="icon-container flex-center clean-link btn-pointer" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
      <i class="fab fa-facebook-f fa-2x btn-pointer"></i>  
      </a>`;
	}

	doUploadImg(elForm, onSuccess);
}

function onSwitchGalleryEditor() {
	document.querySelector('.canvas-editor-container').classList.toggle('hide');
	document.querySelector('.images-container').classList.toggle('hide');
	document.querySelector('.about').classList.toggle('hide');
	let elLink = document.querySelector('.menu-item');
	if (elLink.innerText === 'Gallery') elLink.innerText = 'Editor';
	else elLink.innerText = 'Gallery';
}

function drawTextBorder() {
	const { xMin, xMax, yMin, yMax } = prepCoordinatesForBorder();
	gCtx.save();
	gCtx.beginPath();
	gCtx.setLineDash([5, 15]);
	gCtx.moveTo(xMin, yMin);
	gCtx.lineTo(xMax, yMin);
	gCtx.lineTo(xMax, yMax);
	gCtx.lineTo(xMin, yMax);
	gCtx.closePath();
	gCtx.strokeStyle = 'gold';
	gCtx.stroke();
	gCtx.restore();
}

function resizeCanvas() {
	const elContainer = document.querySelector('.canvas-container');
	gElCanvas.width = elContainer.offsetWidth;
	gElCanvas.height = elContainer.offsetHeight;
}

// function onChangeProperty(value, property) {
// 	// const value = elValue.value;
// 	changeProperty(value, property);
// 	renderCanvas();
// }
