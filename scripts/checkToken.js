const url = "http://localhost:8000"

const checkTokenIsValid = async () => {
  const token = localStorage.getItem("authToken")
  if(!token){
    return console.log("Token not found.")
  }

  const res = await fetch(`${url}/check-token`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(res => res.json())
  
  if(res.statusCode && res.statusCode != 200){
    window.location.replace("../pages/login.html")
    return
  }
}

window.addEventListener("beforeunload", checkTokenIsValid())