'use strict';

function onDownloadImg(elLink) {
	var imgContent = gElCanvas.toDataURL('image/jpeg')
	elLink.href = imgContent
}

function onUploadImg(elForm, ev) {
  ev.preventDefault();
  document.getElementById('imgData').value = gElCanvas.toDataURL("image/jpeg");

  function onSuccess(uploadedImgUrl) {
      uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      document.querySelector('.share-container').innerHTML = `
      <a class="icon-container flex-center clean-link btn-pointer" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
      <i class="fab fa-facebook-f fa-2x btn-pointer"></i>  
      </a>`
  }

  doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
  var formData = new FormData(elForm);
  fetch('//ca-upload.com/here/upload.php', {
      method: 'POST',
      body: formData
  })
  .then(function (res) {
      return res.text()
  })
  .then(onSuccess)
  .catch(function (err) {
      console.error(err)
  })
}