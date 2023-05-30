//Menu
document.addEventListener("DOMContentLoaded", function(event){
    let menu = document.getElementsByClassName("menu")[0];
    let ico_menu = document.getElementsByClassName("ico-menu")[0];
  
    function fecharMenu(event) {
      if (menu.classList.contains("open") && !menu.contains(event.target) && !ico_menu.contains(event.target)){
        menu.classList.remove("open")
      }
    }
  
    ico_menu.addEventListener("click", function(){
      menu.classList.toggle("open")
    })
  
    document.addEventListener("click", fecharMenu);
  });

  let search = document.getElementsByClassName("inp-search")[0];
  let lupa = document.getElementsByClassName("search-icon")[0];

  search.addEventListener("focus", () => {
    lupa.style.display = "none";
  });
  
  search.addEventListener("blur", () => {
    if (search.value == "") {
      lupa.style.display = "block";
    }
  });