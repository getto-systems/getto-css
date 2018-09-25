var version = document.getElementById("version").innerText.replace("version : ","");

var check_versions = function(current) {
  if (current == "DEV") {
    return [];
  }

  var versions = [];

  var next = function(v, index) {
    v = v.slice();
    if (v.length > index) {
      v[index] = parseInt(v[index]) + 1;
    }
    return v.join(".");
  };

  var info = current.split(".");

  info.forEach(function(_, i) {
    versions.push(next(info, i));
  });

  return versions;
}

var _redirect = function(paths){
  var path = paths.shift();
  if (!path) {
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4) {
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
_redirect(check_versions(version).map(function(version){ return "/" + version + "/index.html" }));
