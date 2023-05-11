const urlPath = "http://localhost:8000"

const checkTokenIsValid = async () => {
  const token = localStorage.getItem("authToken")
  if(!token){
    return console.log("Token not found.")
  }

  const res = await fetch(`${urlPath}/check-token`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(res => res.json())
  
  const currentPath = window.location.pathname
  if(res.statusCode && res.statusCode !== 200){
    if(currentPath.includes("home") || currentPath.includes("profile")){
      window.location.replace("../pages/login.html")
    }
    return
  }

  if(currentPath.includes("login")){
    window.location.replace("../pages/home.html")
  }
  return
}

window.addEventListener("beforeunload", checkTokenIsValid())