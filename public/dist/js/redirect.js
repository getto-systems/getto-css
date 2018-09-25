var version = document.getElementById("version").innerText.replace("version : ","");

var check_versions = function(current) {
  if (current == "DEV") {
    return [];
  }

  var versions = [];

  var next_patch = function(v) {
    v = v.slice(0.3);
    if (v.length > 2) {
      v[2] = parseInt(v[2]) + 1;
    }
    return v.join(".");
  };
  var next_minor = function(v) {
    v = v.slice(0,2);
    if (v.length > 1) {
      v[1] = parseInt(v[1]) + 1;
    }
    v.push(0);
    return v.join(".");
  };
  var next_major = function(v) {
    v = v.slice(0,1);
    if (v.length > 0) {
      v[0] = parseInt(v[0]) + 1;
    }
    v.push(0);
    v.push(0);
    return v.join(".");
  };

  var info = current.split(".");

  versions.push(next_patch(info, i));
  versions.push(next_minor(info, i));
  versions.push(next_major(info, i));

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
