export const createCategrory = (userId, token, category) => {
    return fetch(`http://localhost:8000/api/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  
  

  export const createProduct = (userId, token, product) => {
    return fetch(`http://localhost:8000/api/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: product
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };


  export const getCategories = ()=>{
    return fetch(`http://localhost:8000/api/categories`,{
      method: "GET"
    })
    .then(response =>{
      return response.json()
    })
    .catch(err=> {
      console.log(err);
    })
  }
  