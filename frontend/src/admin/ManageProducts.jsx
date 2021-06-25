import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { createCategrory } from "./apiAdmin";
import { Link } from "react-router-dom";
import { getProducts, deleteProducts } from './apiAdmin'

const ManageProducts = () => {

  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated()

  const loadProducts = ()=>{
      getProducts().then(data=>{
          if(data.error){
              console.log(data.error)
          }else{
              setProducts(data)
          }
      })
  }

  const destroy = (productId)=>{
    deleteProducts(productId, user._id, token).then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
            loadProducts()
        }
    })
  }

  useEffect(()=>{
    loadProducts();
  },[])

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on Products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12" >
            <h2 className="text-center">Total {products.length} products</h2>
            <hr />
            <ul className="list-group">
                {products.map((p,i)=>(
                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>{p.name}</strong>
                        <Link to={`/admin/product/update/${p._id}`} >
                            <span className="btn btn-warning ">Update</span>
                        </Link>
                        <span onClick={()=> destroy(p._id)} className="btn btn-danger">
                            Delete
                        </span>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
