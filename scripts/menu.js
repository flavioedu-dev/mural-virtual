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
    menu.classList.add("open")
  })

  document.addEventListener("click", fecharMenu);
});

// Redirect to each menu page
const menuOptions = document.getElementsByClassName("opc-per")
const optionsMenu = [...menuOptions]
optionsMenu.forEach((option) => {
  option.onclick = () => {
    // Getting path
    let path = window.location.pathname
    if(path.includes("user/")){
      path = "user"
    }else if(path.includes("admin/")){
      path = "admin"
    }
    // Redirecting to the specified page
    switch(option.children[1].textContent) {
      case "Perfil":
        if (path === "admin") return window.location.href = `/pages/${path}/profile-users.html`;
        window.location.href = `/pages/${path}/profile.html`;
        break
      case "Postagens":
        if (path === "admin") return window.location.href = `/pages/${path}/posts-requests.html`;
        window.location.href = `/pages/${path}/posts.html`;
        break
      case "Configurações":
        alert("Página em desenvolvimento...")
        break
      case "Sair":
        window.location.href = `/pages/login.html`;
        break
      default:
        break
    }
  }
})