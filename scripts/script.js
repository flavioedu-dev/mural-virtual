// Search input
let search = document.getElementsByClassName("inp-search")[0]
let pesq = document.getElementsByClassName("pesq")[0]
let lupa = document.getElementsByClassName("search-icon")[0]
let attachment = document.getElementsByClassName("attachment-search")[0]
let containerSearch = document.getElementsByClassName("search-container")[0]

/*
// When the search is focused
search.addEventListener('focus', () => {
    lupa.style.display = 'none'
    attachment.style.display = 'block'
    containerSearch.style = 'padding-bottom: 2rem; background-color: #E0E0E0; border-radius: 5px;'
})

// When the research loses focus
search.addEventListener('blur', () => {
    if(search.value == ''){
        lupa.style.display = 'block'
    }

    attachment.style.display = 'none'
    containerSearch.style = 'padding-bottom: 0rem; background-color: transparent; border-radius: 0px;'
})
*/

const meuBotao = document.getElementById("bott");
let botaoAtivado = false;
meuBotao.addEventListener("click", function() {
    console.log(botaoAtivado)
    if(botaoAtivado == false){
        pesq.style.display = 'block'
        search.style.display = 'none'
        lupa.style.display = 'none'
        botaoAtivado = true
    }else if(botaoAtivado == true){
        pesq.style.display = 'none'
        search.style.display = 'block'
        lupa.style.display = 'block'
        botaoAtivado = false
    }

  });

  search.addEventListener('focus', () => {
    lupa.style.display = 'none'
})

search.addEventListener('blur', () => {
    if(search.value == '' ){
        lupa.style.display = 'block'
    }
})

pesq.addEventListener('focus', () => {
    attachment.style.display = 'block'
})

pesq.addEventListener('blur', () =>{
    attachment.style.display = 'none'
})