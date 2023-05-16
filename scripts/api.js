const url = "http://localhost:8000";

// User
const register = async () => {
  const nome = document.getElementById("user").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("pass").value;
  const confirmaSenha = document.getElementById("confirm-pass").value;

  if (senha !== confirmaSenha) {
    console.log("As senhas precisam ser iguais!");
    return;
  }

  const user = {
    nome,
    email,
    senha,
  };

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

  // Checking if the user was successfully created and redirecting
  if (res.status === 201) {
    console.log("Usuário criado com sucesso!");
    setTimeout(() => {
      window.location.replace("../pages/login.html");
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
  }).then((res) => res.json());

  if (res.headers.token) {
    localStorage.setItem("authToken", res.headers.token);
    localStorage.setItem("userId", res.body.id_usuario);

    window.location.replace("../pages/home.html");
  }
};

const checkTokenIsValid = async () => {
  const token = localStorage.getItem("authToken")

  const posts = await fetch(`${url}/posts`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then((res) => res.json());

  if(posts.statusCode !== 401){
    window.location.replace("../pages/home.html")
  }
}

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

  const { nome, email, telefone, postagens } = res;

  document.getElementsByClassName("data-item")[0].innerText = nome;
  document.getElementsByClassName("data-item")[1].innerText = email;
  document.getElementsByClassName("data-item")[2].innerText =
    telefone || "Não informado.";
  document.getElementsByClassName("data-item")[3].innerText = postagens;
};

const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("authToken");
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

  const resPost = await fetch(`${url}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

  console.log(resPost)
}