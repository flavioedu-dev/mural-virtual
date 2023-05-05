//Menu
let menu = document.getElementsByClassName("menu")[0]
let ico_menu = document.getElementsByClassName("ico-menu")[0]

const eventoClick = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
});

ico_menu.addEventListener('click', () =>{
    menu.style.display = 'block'
    menu.dispatchEvent(eventoClick);
});

menu.addEventListener('blur', () => {
    menu.style.display = 'none'
})

document.getElementById('icon-sair').addEventListener('click', function() {
    window.location.href = '../pages/login.html';
});