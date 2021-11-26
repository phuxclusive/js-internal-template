/*
  Handle directory scanning
*/
function loadDirFiles(dirFile) {
  return new Promise((resolve, reject) => {
    try {
      var fileNames = new Array();
      var tblHead = "<thead><th>File Type</th><th>File Name</th><th>Last Modified</th></thead>";
      $.ajax({
        url: dirFile,
        success: function(data) {
          var regex =  /(\d{1,2}[-/]){2}\d{2}(\d{2})?/g // this should work for both IIS & Apache
          var elemMod = data.match(regex); // build an array for dates found
          var b = 0;
          for (var i = 0; i < $(data).find('a').length; i++) {
            var elem = $(data).find('a')[i];
            // Apache doesn't present the whole filename like IIS does, so we can't rely on elem.innerHTML
            // I should probably config so the uri reads with encoded spaces
            var elemInner = $(elem).attr("href");
            var elemType = openFile(elemInner); // Return the file type
            if(elemType){
              var elemName = elemInner.replace(/%20/g,' '); // Replace encoded spaces with human-readable
              var isDiv = "<tr><td class='"+elemType+"'></td><td><a href='"+dirFile+elemName+"''>"+elemName+"</a></td><td>"+elemMod[b]+"</td></tr>";
              b = b+1;
              fileNames.push(isDiv);
            }
          }
          return resolve(fileNames);
        }
      });
    } catch (ex) {
      console.error(ex);
      return reject(new Error(ex));
    }
  });
}
// Get the file extension, and apply a style class to table row for item
function openFile(file) {
  var extension = file.substr( (file.lastIndexOf('.') +1) );
  switch(extension) {
    case 'jpg':
    case 'png':
    case 'gif':
      return 'image';
    case 'zip':
    case 'rar':
      return 'zip';
    case 'pdf':
      return 'pdf';
    case 'doc':
    case 'docx':
    case 'dot':
      return 'doc';
    case 'xls':
    case 'xlsx':
    case 'xlt':
      return 'excel';
    case 'mp4':
    case 'wmv':
    case 'mpeg':
      return 'video';
    default:
      return false;
  }
};
