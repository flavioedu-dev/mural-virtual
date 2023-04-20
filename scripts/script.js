// Search input
let search = document.getElementsByClassName("inp-search")[0]
let lupa = document.getElementsByClassName("search-icon")[0]

search.addEventListener('focus', () => {
    console.log(search.value)
    lupa.style.display = 'none'
})

search.addEventListener('blur', () => {
    if(search.value == ''){
        lupa.style.display = 'block'
    }
})