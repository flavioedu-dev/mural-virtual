const url = "http://localhost:8000";

const handleShowError = (path, sendErr) => {
  const resContainer = document.querySelector(`.res_${path}`)
  resContainer.innerHTML = ""
  const resParaph = document.createElement("p")
  resParaph.setAttribute("class", `.res_${path}`)
  resParaph.innerText= sendErr
  resContainer.appendChild(resParaph)
}

// User
const register = async () => {
  const nome = document.getElementById("user").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("pass").value;
  const confirmaSenha = document.getElementById("confirm-pass").value;
  const username = document.getElementById("username").value;
  const tipo = document.getElementById("select-Iam").value;

  let user = {
    nome,
    username,
    email,
    senha,
    tipo
  };

  // Checking if all fields are filled
  for(i in user) {
    if(user[i].trim() === ""){
      i = i.charAt(0).toUpperCase() + i.slice(1)
      if(i === "Username") i = "Nome de usuário"
      return alert(`É necessário preencher o campo ${i}.`)
    }
  }

  if (senha !== confirmaSenha) {
    alert("As senhas precisam ser iguais!");
    return;
  }

  if(tipo === "unselected"){
    alert("Selecione o seu tipo de perfil.")
    return
  }

  if(tipo === "Admin") {
    console.log("is admin")
    const adminCode = document.getElementById("admin-code").value
    user = {...user, adminCode }
    console.log(adminCode)
  }

  const res = await fetch(`${url}/users/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res)
    .catch((err) => console.log(err));

  const data = await res.json();
  console.log(data);


  let erro = null
  if(data.includes("Username already")) {
    erro = "Nome de usuário já cadastrado."
  }else if(data.includes("Invalid email")) {
    erro = "Email inválido."
  }else if(data.includes("Email already")) {
    erro = "Email já cadastrado."
  }else if(data.includes("at least")) {
    erro = "A senha precisa ter no mínimo 8 caracteres."
  }else if(data.includes("code invalid")) {
    erro = "Código de acesso inválido."
  }

  if(erro){
    handleShowError("register", erro)
    return
  }

  // Checking if the user was successfully created and redirecting
  if(data.includes("Admin")) {
    console.log("Usuário criado com sucesso!");
    setTimeout(() => {
      window.location.href= "../pages/admin/home.html";
    }, 1000);
  }else if(data.includes("User")) {
    console.log("Administrador criado com sucesso!");
    setTimeout(() => {
      window.location.href= "../pages/user/home.html";
    }, 1000);
  }
};

const login = async () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("pass").value;

  const user = {
    email,
    senha,
  };

  const res = await fetch(`${url}/users/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res);

  const data = await res.json()
  console.log(data)
  if(data.includes("admin")) {
    window.location.href = "../pages/admin/home.html"
    return
  }else if (data.includes("user")) {
    window.location.href = "../pages/user/home.html"
    return
  }

  handleShowError("login", "Credenciais inválidas.")
};

const checkTokenIsValid = async () => {
  const token = localStorage.getItem("authToken");
  const id = localStorage.getItem("userId");
  const res = await fetch(`${url}/users/user/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then((res) => res.json());

  if(res.statusCode !== 401){
    window.location.replace("../pages/home.html")
  }
}

// Loading profile data
const profile = async () => {
  const token = localStorage.getItem("authToken");
  const id = localStorage.getItem("userId");
  const res = await fetch(`${url}/users/user/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then((res) => res.json());

  if(res.statusCode){
    window.location.replace("../pages/login.html")
  }

  console.log(res)

  const { nome, email, telefone, postagens, username } = res;

  document.querySelector(".nome-menu").innerText = localStorage.getItem("userName");
  document.querySelector(".user-name").innerText = username;
  document.getElementsByClassName("data-item")[0].innerText = nome;
  document.getElementsByClassName("data-item")[1].innerText = email;
  document.getElementsByClassName("data-item")[2].innerText =
    telefone || "Não informado.";
  document.getElementsByClassName("data-item")[3].innerText = postagens;
};

const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("authToken");
  localStorage.removeItem("userName");
  location.reload(true);
};

// Post
const loadPosts = async () => {
  const token = localStorage.getItem("authToken")

  const posts = await fetch(`${url}/posts`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then((res) => res.json());

  if(posts.statusCode === 401){
    window.location.replace("../pages/login.html")
  }

  document.querySelector(".nome-menu").innerText = localStorage.getItem("userName");

  const postsContainer = document.querySelector(".posts-container");
  posts.forEach((post) => {
    const postItem = document.createElement("div");
    postItem.setAttribute("class", "post");

    const imgPost = document.createElement("img");
    imgPost.setAttribute("src", "../img/Perfil LinkedIn.png");

    // div -> span -> p.text-post
    const innerPostItem = document.createElement("div");
    const spanItem = document.createElement("span");
    const textItem = document.createElement("p");
    textItem.setAttribute("class", "text-post");
    spanItem.innerText = post.nome;
    textItem.innerText = post.conteudo;

    innerPostItem.appendChild(spanItem);
    innerPostItem.appendChild(textItem);

    postItem.appendChild(imgPost);
    postItem.appendChild(innerPostItem);

    postsContainer.appendChild(postItem);
  });
};


const createPost = async () => {
  const id_usuario = parseInt(localStorage.getItem("userId"))
  const conteudo = document.querySelector(".pesq").value

  const post = {
    id_usuario,
    conteudo
  }

  const token = localStorage.getItem("authToken")
  const resPost = await fetch(`${url}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

  console.log(resPost)
}

// Login
const redirectToHome = () => {
  window.location.replace("../pages/user/home.html")
}

// Admin - Home
const showPost = (id) => {
  window.location.replace(`./post-request.html?id=${id}`)
}