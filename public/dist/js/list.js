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

document.getElementById("delete").addEventListener("click", function(e){
  show(document.getElementById("delete-dialog"));
  e.preventDefault();
});
document.getElementById("close-button1").addEventListener("click", function(e){
  hide(document.getElementById("delete-dialog"));
  e.preventDefault();
});
document.getElementById("close-button2").addEventListener("click", function(e){
  hide(document.getElementById("delete-dialog"));
  e.preventDefault();
});

document.getElementById("dialog").addEventListener("click", function(e){
  show(document.getElementById("table-dialog"));
  e.preventDefault();
});
document.getElementById("close-button3").addEventListener("click", function(e){
  hide(document.getElementById("table-dialog"));
  e.preventDefault();
});

document.getElementById("dialog2").addEventListener("click", function(e){
  show(document.getElementById("complete-dialog"));
  e.preventDefault();
});
document.getElementById("close-button4").addEventListener("click", function(e){
  hide(document.getElementById("complete-dialog"));
  e.preventDefault();
});
document.getElementById("close-button5").addEventListener("click", function(e){
  hide(document.getElementById("complete-dialog"));
  e.preventDefault();
});

document.getElementById("edit-button").addEventListener("click", function(e){
  show(document.getElementById("edit-dialog"));
  e.preventDefault();
});
document.getElementById("save").addEventListener("click", function(e){
  hide(document.getElementById("edit-dialog"));
  e.preventDefault();
});

document.getElementById("edit-list-button").addEventListener("click", function(e){
  show(document.getElementById("edit-list-dialog"));
  e.preventDefault();
});
document.getElementById("save-list").addEventListener("click", function(e){
  hide(document.getElementById("edit-list-dialog"));
  e.preventDefault();
});
