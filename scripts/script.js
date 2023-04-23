// Search input
let search = document.getElementsByClassName("inp-search")[0]
let pesq = document.getElementsByClassName("pesq")[0]
let lupa = document.getElementsByClassName("search-icon")[0]
let attachment = document.getElementsByClassName("attachment-search")[0]
let containerSearch = document.getElementsByClassName("search-container")[0]


const meuBotao = document.getElementById("bott");
let botaoAtivado = false;
meuBotao.addEventListener("click", function() {
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
    containerSearch.style = "padding-bottom: 2rem; background-color: #E0E0E0; border-radius: 5px;"
})

pesq.addEventListener('blur', () =>{
    attachment.style.display = 'none'
    containerSearch.style = "padding-bottom: -2rem;"
})

// Hiding information the exceeds the limit
let textPost = document.getElementsByClassName("text-post")

const textPostList = [...textPost]

const beforeTexts = []

textPostList.forEach((post, i) => {

    if(post.innerHTML.length > 299){

        beforeTexts.push(textPost[i].innerText)
        let newText = textPost[i].innerText.substring(0, 291)

        textPost[i].innerText = newText
        let more = document.createElement("span")
        more.setAttribute("class", `more`)
        more.innerHTML = "Ver mais"
        textPost[i].appendChild(more)

    }
})

// Show more informations
let more = document.getElementsByClassName("more")

const moreList = [...more]

moreList.forEach((item, i) => {

    item.addEventListener("click", () => {
        console.log(`Item ${i}`)

        console.log(item.parentNode)

        item.parentNode.innerHTML = beforeTexts[i]
    })
})