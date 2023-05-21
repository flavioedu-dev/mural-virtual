const redirectToLogin = () => {
  window.location.replace("./pages/login.html");
};

// Register
const checkIsAdmin = () => {
  const optSelected = document.getElementById("select-Iam");
  const form = document.querySelector(".user-data");

  if (optSelected.value === "Admin") {
    const inpAdminCode = document.createElement("input");
    inpAdminCode.setAttribute("type", "password");
    inpAdminCode.setAttribute("id", "admin-code");
    inpAdminCode.setAttribute("placeholder", "Código de acesso");
    form.appendChild(inpAdminCode);
    return;
  }

  try {
    const admInpCode = document.getElementById("admin-code");
    form.removeChild(admInpCode);
  } catch {}
};

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

const meuBotao = document.getElementById("bott");
let botaoAtivado = false;
meuBotao.addEventListener("click", function () {
  if (botaoAtivado == false) {
    pesq.style.display = "block";
    search.style.display = "none";
    lupa.style.display = "none";
    botaoAtivado = true;
    attachment.style.display = "block";
    containerSearch.style = "background-color: #E0E0E0;";
    options.style.display = "block";
    if (attachmentFiles.children.length !== 0) {
      attachmentFiles.style.display = "flex";
      pesq.style.borderBottom = "10px solid transparent";
    }
  } else if (botaoAtivado == true) {
    pesq.style.display = "none";
    search.style.display = "block";
    lupa.style.display = "block";
    botaoAtivado = false;
    attachment.style.display = "none";
    attachmentFiles.style.display = "none";
    containerSearch.style = "background-color: transparent;";
    options.style.display = "none";
  }
});

search.addEventListener("focus", () => {
  lupa.style.display = "none";
});

search.addEventListener("blur", () => {
  if (search.value == "") {
    lupa.style.display = "block";
  }
});

// Rendering posts
const renderPosts = (array) => {
  array.forEach((post) => {
    // Creating post item
    const divPost = document.createElement("div");
    divPost.setAttribute("class", "post");

    const imgPost = document.createElement("img");
    imgPost.setAttribute("src", "../img/Perfil LinkedIn.png");
    imgPost.setAttribute("alt", "profile");

    const innerDivPost = document.createElement("div");
    const innerDivSpan = document.createElement("span");
    const innerDivP = document.createElement("p");
    innerDivP.setAttribute("class", "text-post");

    innerDivSpan.innerText = "Flávio";
    innerDivP.innerText = post;

    innerDivPost.appendChild(innerDivSpan);
    innerDivPost.appendChild(innerDivP);

    divPost.appendChild(imgPost);
    divPost.appendChild(innerDivPost);

    postsContainer.appendChild(divPost);
  });
};

const posts = [];

// Handle form options
options.onclick = (e) => {
  console.log(e.target.lastChild.data);

  if (e.target.lastChild.data === "Limpar") {
    pesq.value = "";
  }

  if (e.target.lastChild.data === "Enviar") {
    posts.push(pesq.value);
    pesq.value = "";

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
    deleteIcon.setAttribute("src", "../img/x-icon.png");
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

//Menu
let menu = document.getElementsByClassName("menu")[0];
let ico_menu = document.getElementsByClassName("ico-menu")[0];
let p = document.getElementsByClassName("type")[0];
let estilo = window.getComputedStyle(p);
let cont_p = estilo.getPropertyValue("display");
console.log(cont_p);

const eventoClick = new MouseEvent("click", {
  view: window,
  bubbles: true,
  cancelable: true,
});

ico_menu.addEventListener("click", () => {
  menu.style.display = "block";
  menu.dispatchEvent(eventoClick);
});

menu.addEventListener("blur", () => {
  if (cont_p == "block") {
    menu.style.display = "none";
  }
});

// document.getElementById('icon-sair').addEventListener('click', function() {
//     window.location.href = '../pages/login.html';
//   });

//Filtragem

let pesquisa = document.getElementsByClassName("inp-search")[0];
