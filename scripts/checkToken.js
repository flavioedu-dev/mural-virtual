const urlPath = "http://localhost:8000"

const checkTokenIsValid = async () => {
  const currentPath = window.location.pathname

  const token = localStorage.getItem("authToken")
  if(!token){
    if(currentPath.includes("home") || currentPath.includes("profile")){
      window.location.replace("../pages/login.html")
    }
    return console.log("Token not found.")
  }

  const res = await fetch(`${urlPath}/users/check-token`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(res => res.json())
  
  
  if(res.statusCode && res.statusCode !== 200){
    console.log("entrou1")
    if(currentPath.includes("home") || currentPath.includes("profile")){
      window.location.replace("../pages/login.html")
    }
    return
  }

  if(currentPath.includes("login")){
    window.location.replace("../pages/home.html")
  }

  localStorage.setItem("userId", res.id_usuario)
  return
}

window.addEventListener("beforeunload", checkTokenIsValid())