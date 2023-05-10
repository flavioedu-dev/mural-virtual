const url = "http://localhost:8000"

const register = async () => {
  const nome = document.getElementById("user").value
  const email = document.getElementById("email").value
  const senha = document.getElementById("pass").value
  const confirmaSenha = document.getElementById("confirm-pass").value

  if(senha !== confirmaSenha){
    console.log("As senhas precisam ser iguais!")
    return
  }

  const user = {
    nome,
    email,
    senha
  }

  const res = await fetch(`${url}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(res => res).catch(err => console.log(err))

  const data = await res.json()
  console.log(data)

  // Checking if the user was successfully created and redirecting
  if(res.status === 201){
    console.log("Usuário criado com sucesso!")
    setTimeout(() => {
      window.location.replace("../pages/login.html")
    }, 1000)
  }
}

const login = async () => {
  const email = document.getElementById("email").value
  const senha = document.getElementById("pass").value

  console.log(email)

  const res = await fetch(`${url}/user/${email}`).then(res => res.json())

  console.log(res)
}

// fetch(`${url}/user/tratamentodedados123@gmail.com`).then(res => console.log(res))