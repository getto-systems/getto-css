var version = document.getElementById("version").innerText.replace("version : ","");
GettoDetect().from_current_version(version, function(path) {
  location.href = path;
});
