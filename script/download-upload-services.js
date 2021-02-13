'use strict';



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