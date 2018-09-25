document.forms[0].elements[4].addEventListener("click", function(e){
  var connectingClass = "is-connecting";
  if(this.className == "is-save") {
    this.className = connectingClass;
    this.innerHTML = '<i class="fa fa-spin fa-spinner"></i>';
    e.preventDefault();
  } else {
    if(this.className == connectingClass) {
      this.className = "is-error";
      this.innerHTML = '<i class="fa fa-exclamation-triangle"></i> 保存エラー';

      document.getElementById("normal").classList.add("display-none");
      document.getElementById("error").classList.remove("display-none");

      e.preventDefault();
    }
  }
});
