

// Search input
let search = document.getElementsByClassName("inp-search")[0];
let pesq = document.getElementsByClassName("pesq")[0];
let options = document.getElementsByClassName("pesq-options")[0];
let lupa = document.getElementsByClassName("search-icon")[0];
let attachment = document.getElementsByClassName("attachment-search")[0];
let containerSearch = document.getElementsByClassName("search-container")[0];
let attachmentFiles = document.getElementsByClassName("attachment-files")[0];
let file = document.getElementsByClassName("inp-file")[0];
let postsContainer = document.getElementsByClassName("posts-container")[0];

// Home
const postsContainerArray = [...postsContainer.children]
postsContainerArray.forEach((post, i) => {
    post.addEventListener("click", () => {
          console.log(post)
          post.setAttribute("class", "post post-selected")
          window.location.replace(`./post.html?id=${i}`)
        });
})

search.addEventListener("focus", () => {
  lupa.style.display = "none";
});

search.addEventListener("blur", () => {
  if (search.value == "") {
    lupa.style.display = "block";
  }
});

const meuBotao = document.getElementById("bott");
let botaoAtivado = false;
meuBotao.addEventListener("click", function () {
  if (botaoAtivado == false) {
    pesq.style.display = "block";
    search.style.display = "none";
    lupa.style.display = "none";
    botaoAtivado = true;
    attachment.style.display = "block";
    containerSearch.style = "background-color: #F5F4F4;";
    options.style.display = "block";
    if (attachmentFiles.children.length !== 0) {
      attachmentFiles.style.display = "flex";
      pesq.style.borderBottom = "10px solid transparent";
    }
  } else if (botaoAtivado == true) {
    pesq.style.display = "none";
    search.style.display = "block";
    if (search.value == "") {
      lupa.style.display = "block";
    }
    botaoAtivado = false;
    attachment.style.display = "none";
    attachmentFiles.style.display = "none";
    containerSearch.style = "background-color: transparent;";
    options.style.display = "none";
  }
});

// Rendering posts
const renderPosts = (array) => {
  postsContainer.innerHTML = ""
  array.forEach((post) => { // post > post-div > div > img - span < span
    // Creating post item
    const newPost = document.createElement("div");
    newPost.setAttribute("class", "post");

    // Creating div with class "post-div"
    const postDiv1 = document.createElement("div");
    postDiv1.setAttribute("class", "post-div");

    // Creating div within of div with class "post-div"
    const innerPostDiv1 = document.createElement("div");

    // Creating profile img within inner div
    const imgPost = document.createElement("img");
    imgPost.setAttribute("src", "/img/Perfil LinkedIn.png");
    imgPost.setAttribute("alt", "profile");

    // Creating span within inner div
    const innerDivSpan = document.createElement("span");
    innerDivSpan.innerText = "Flávio";

    // Creating span below the inner div
    const innerDivSpan2 = document.createElement("span");
    innerDivSpan2.setAttribute("class", "date-post")
    let data = new Date()
    innerDivSpan2.innerText = `${data.toLocaleDateString()}`;

    // Inserting img and span in the inner div
    innerPostDiv1.appendChild(imgPost);
    innerPostDiv1.appendChild(innerDivSpan);

    // Inserting inner div and span within div with class "post-div"
    postDiv1.appendChild(innerPostDiv1)
    postDiv1.appendChild(innerDivSpan2)


    // Creating div below div with class "post-div"
    const postDiv2 = document.createElement("div");
    
    // Creating paragraph within div below
    const innerDiv2P = document.createElement("p");
    innerDiv2P.setAttribute("class", "text-post");
    innerDiv2P.innerText = post;

    // Inserting paragraph within div below
    postDiv2.appendChild(innerDiv2P)


    // Inserting div with class "post-div" and div below it within post item
    newPost.appendChild(postDiv1)
    newPost.appendChild(postDiv2)

    // Inserting new post in posts container
    postsContainer.appendChild(newPost);
  });
};

const posts = [];

// Handle form options
options.onclick = (e) => {
  if (e.target.lastChild.data === "Limpar") {
    pesq.value = "";
    attachmentFiles.innerHTML = "";
  }

  if (e.target.lastChild.data === "Enviar") {
    if(pesq.value.length < 20){
      alert("Aviso muito curto!")
      return
    }
    posts.push(pesq.value);
    pesq.value = "";
    attachmentFiles.innerHTML = "";

    renderPosts(posts);
  }
};

posts.length.onchange = () => {
  console.log("Mudou");
};

// Attachment file
attachment.onclick = () => {
  file.click();
};

file.onchange = () => {
  if (file) {
    // Show attachment files when exist file
    if (attachmentFiles.children) {
      attachmentFiles.style.display = "flex";
      pesq.style.borderBottom = "10px solid transparent";
    }

    // Taking item and inserting files
    const [itemFile] = file.files;

    let itemURL = URL.createObjectURL(itemFile);

    const newItem = document.createElement("p");
    newItem.setAttribute("class", `file-item`);

    let newLink = document.createElement("a");
    newLink.innerHTML = itemFile.name;
    newLink.setAttribute("href", `${itemURL}`);
    newLink.setAttribute("target", `_blank`);
    newLink.setAttribute("class", `link-item`);

    let deleteIcon = document.createElement("img");
    deleteIcon.setAttribute("src", "/img/x-icon.png");
    deleteIcon.setAttribute("alt", "delete");
    deleteIcon.setAttribute("class", "delete-icon");

    newItem.appendChild(newLink);
    newItem.appendChild(deleteIcon);
    attachmentFiles.appendChild(newItem);
  }
};

// Delete attachment item
attachmentFiles.onclick = (e) => {
  const element = e.target;

  if (element.className === "delete-icon") {
    attachmentFiles.removeChild(e.target.parentNode);
    file.value = "";
  }
};

// Hiding information the exceeds the limit
let textPost = document.getElementsByClassName("text-post");

const textPostList = [...textPost];

const beforeTexts = [];

textPostList.forEach((post, i) => {
  let text = post.innerHTML.replace(/\s+/g, " ");

  if (text.length > 299) {
    beforeTexts.push(textPost[i].innerText);
    let newText = textPost[i].innerText.substring(0, 291);
    textPost[i].innerText = newText;

    let more = document.createElement("span");
    more.setAttribute("class", `more`);
    more.innerHTML = "Ver mais";
    textPost[i].appendChild(more);
  }
});

// Show more informations
let more = document.getElementsByClassName("more");

let moreList = [...more];

moreList.forEach((item, i) => {
  item.addEventListener("click", () => {
    console.log(`Item ${i}`);

    console.log(item.parentNode);

    item.parentNode.innerHTML = beforeTexts[i];
  });
});

// document.getElementById('icon-sair').addEventListener('click', function() {
//     window.location.href = '../pages/login.html';
//   });

// Filtering of posts
const pesquisa = document.querySelector(".inp-search");

pesquisa.oninput = (e) => {
  const newposts = posts.filter(post => post.includes(e.target.value))
  renderPosts(newposts)
}
