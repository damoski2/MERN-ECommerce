export const signUp = (user) => {
  return fetch(`http://localhost:8000/api/signUp`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signIn = (user) => {
  return fetch(`http://localhost:8000/api/signIn`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`http://localhost:8000/api/signOut`,{
        method: 'GET'
    })
    .then(response=> {
        console.log('signout', response)
    })
    .catch(err => console.log(err))
  }
  next();
};

export const isAuthenticated = ()=>{
    if(typeof window == "undefined"){
        return false
    }

    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false;
    }
}
