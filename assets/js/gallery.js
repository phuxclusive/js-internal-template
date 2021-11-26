/*
  Lightbox Gallery Functionality
*/
/*
  Grab all image files from the given directory,
  create an array, and populate the Gallery div
*/
function loadFileNames(dir) {
  return new Promise((resolve, reject) => {
    try {
      var fileNames = new Array();
      $.ajax({
        url: dir,
        success: function(data) {
          for (var i = 1; i < $(data).find('a').length; i++) {
            var elem = $(data).find('a')[i];
            if(openFile($(elem).attr("href"))){
              //console.log(elemType);
              var elemInner = elem.innerHTML;
              var isDiv = "<a href='"+dir+"/"+elemInner+"''><img src='"+dir+"/"+elemInner+"' alt='"+elemInner+"'></a>";
              fileNames.push(isDiv);
            }
          }
          //console.log(data);
          return resolve(fileNames);
        }
      });
    } catch (ex) {
      return reject(new Error(ex));
    }
  });
}
/*
  Check to see if the file extension is an image
*/
function openFile(file) {
  var extension = file.substr((file.lastIndexOf('.')+1));
  switch(extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return true;
    default:
      return false;
  }
};
/*
  We have to ensure that the lightbox is called
  *after* we have populated the rest of the DOM
*/
function loadLightbox(){
  var $gallery = new SimpleLightbox('.gallery a', {});
};
