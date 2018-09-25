if (document.getElementById("version").innerText == "version : DEV") {
  var reload = document.createElement("script");
  reload.src = "/reload/reload.js";
  document.body.appendChild(reload);
}
