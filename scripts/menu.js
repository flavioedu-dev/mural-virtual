// Menu
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

// Redirect to each menu page
const menuOptions = document.getElementsByClassName("opc-per")
const optionsMenu = [...menuOptions]
optionsMenu.forEach((option) => {
  option.onclick = () => {
    console.log(option.children[1].textContent)
    switch(option.children[1].textContent) {
      case "Perfil":
        window.location.href = "/pages/user/profile.html";
        break
      case "Postagens":
        window.location.href = "/pages/user/posts.html";
        break
      case "Configurações":
        alert("Página em desenvolvimento...")
        break
      case "Sair":
        window.location.href = "/pages/login.html";
        break
      default:
        break
    }
  }
})