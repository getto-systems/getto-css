var _redirect = function(paths){
  var path = paths.shift();
  if (!path) {
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4) {
      if(xhr.status == 200) {
        location.href = path;
      } else {
        if(paths) {
          _redirect(paths);
        }
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
};
_redirect([
  "/0.3.3/index.html",
  "/dist/index.html"
]);
