var show = function(element) {
  if (element.classList.contains("display-none")) {
    element.classList.remove("display-none");
  }
};
var hide = function(element) {
  if (!element.classList.contains("display-none")) {
    element.classList.add("display-none");
  }
};

document.getElementById("delete-open-button").addEventListener("click", function(e){
  var dialog = document.getElementById("delete-dialog");
  show(dialog);
  e.preventDefault();
});
document.getElementById("delete-button").addEventListener("click", function(e){
  show(document.getElementById("delete-dialog-error"));
  document.getElementById("delete-button").className = "is-error";
  document.getElementById("delete-button").innerHTML = "削除エラー";
  e.preventDefault();
});
document.getElementById("delete-close-button").addEventListener("click", function(e){
  hide(document.getElementById("delete-dialog"));
  hide(document.getElementById("delete-dialog-error"));
  document.getElementById("delete-button").className = "is-delete";
  document.getElementById("delete-button").innerHTML = "削除";
  e.preventDefault();
});
