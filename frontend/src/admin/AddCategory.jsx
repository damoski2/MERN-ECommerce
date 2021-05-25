import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index'
import { createCategrory } from './apiAdmin';
import { Link } from 'react-router-dom'


const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and info from localStorage
    const { user, token } = isAuthenticated()

    const handleChange = (e)=>{
        setError("")
        setName(e.target.value)
    }

    const clickSubmit = (e)=>{
        e.preventDefault()
        setError('')
        setSuccess(false)
        // make request to api to create category
        createCategrory(user._id, token, {name})
        .then(data=>{
            if(data.error){
                setError(true)
            }else{
                setError('')
                setSuccess(true);
            }
        })
    }

    const showSuccess = ()=>{
        if(success){
            return <h3 className="text-success" >{name} is created</h3>
        }
    }

    const showError = ()=>{
        if(error){
            return <h3 className="text-danger" >Category is should be unique</h3>
        }
    }

    const goBack = ()=>{
       return(
           <div className="mt-5">
               <Link to="/admin/dashboard" className="text-warning" >
                   Back to DashBoard
               </Link>
           </div>
       )
    }

    const newCategoryForm = ()=>(
        <form onSubmit={clickSubmit} action="">
            <div className="form-group">
                <label htmlFor="" className="text-muted">Name</label>
                <input type="text" className="form-control" value={name} onChange={handleChange} autoFocus required />   
            </div>
            <button className="btn btn-outline-primary mt-3" >Create Category</button>
        </form>
    )

    return (
        <Layout title="Add a new Category" description={`Good day ${user.name}, ready to add a new category?`}  >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory
