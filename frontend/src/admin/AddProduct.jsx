/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { createProduct } from "./apiAdmin";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  useEffect(()=>{
    setValues({...values, formData: new FormData()})
  },[])

  const handleChange =(name)=> event=>{
      const value = name ==='photo'? event.target.files[0] : event.target.value
      formData.set(name, value)
      setValues({...values, [name]:value})
  }

  const clickSubmit =(event)=>{
    //
  }


  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit} >
      <h4>Post Photo</h4>

      <div className="form-group">
        <label className="btn btn-secondary">
          <input onChange={handleChange('photo')} name="photo" type="file" accept="image/*" />
        </label>
      </div>

      <div className="form-group">
          <label className="text-muted">Name</label>
          <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
      </div>

      <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea onChange={handleChange('description')} className="form-control" value={description} />
      </div>

      <div className="form-group">
          <label className="text-muted">Price</label>
          <input onChange={handleChange('price')} type="text" className="form-control" value={price} />
      </div>

      <div className="form-group">
          <label className="text-muted">Category</label>
          <select onChange={handleChange('category')} className="form-control" >
            <option value="60acc17e6537003da065d9ff">Python</option>
          </select>
      </div>

      <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select onChange={handleChange('shipping')} className="form-control">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
      </div>

      <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
      </div>

      <button className="btn btn-outline-primary">Create Product</button>  
    </form>
  );

  return (
    <Layout
      title="Add a new Product"
      description={`Good day ${user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newPostForm()}</div>
      </div>
    </Layout>
  );
};

export default AddProduct;
