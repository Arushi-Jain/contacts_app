// store access token in local storage
export function setProfile(response){
   window.localStorage.setItem("token",JSON.stringify(response.accessToken))
   window.localStorage.setItem("response",JSON.stringify(response))
}

export function hasToken(){
    if(window.localStorage.getItem("token")){
        return true
    }else
      return false
} 

export function getToken(){
    return JSON.parse(window.localStorage.getItem("token"))
}

export function clear(){
    window.localStorage.clear()
}

export function getProfileObj() {
    let res = JSON.parse(window.localStorage.getItem("response"))
    return res.profileObj
 }

export function getResponseObj() {
   let res = JSON.parse(window.localStorage.getItem("response"))
   return res
}