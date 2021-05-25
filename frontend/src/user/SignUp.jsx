import React, {useEffect, useState} from "react";
import { Layout } from "../imports";
import { API } from '../config'
import { Link } from 'react-router-dom';
import { signUp } from '../auth'
require('dotenv').config();

const SignUp = () => {

   const [values, setValues] = useState({
       name: "",
       email: "",
       password: "",
       error: "",
       success: false
   });

   const { name, email, password, success, error } = values;

   const InputOnchange = name=> event =>{
        setValues({...values, error: false, [name]:event.target.value });
   };


   const clickSubmit =(e)=>{
    e.preventDefault();
    setValues({...values, error:false})
    signUp({name, email, password})
    .then(data=>{
        if(data.error){
            setValues({...values, error: data.error, success: false})
        }else{
            setValues({...values, name:'',email:'',password:'',error:'',success:true})
        }
    })
   }

   const signUpForm = ()=>(
       <form>
           <div className="form-group">
               <label htmlFor="" className="text-muted">Name</label>
               <input name="name" value={name} onChange={InputOnchange('name')} type="text" className="form-control" />
           </div>

           <div className="form-group">
               <label htmlFor="" className="text-muted">Email</label>
               <input name="email" value={email} onChange={InputOnchange('email')} type="email" className="form-control" />
           </div>

           <div className="form-group">
               <label htmlFor="" className="text-muted">Password</label>
               <input name="password" value={password} onChange={InputOnchange('password')} type="password" className="form-control" />
           </div>

           <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
       </form>
   );

   const showError = ()=>(
       <div className="alert alert-danger" style={{display: error? 'block':'none'}} >
           {error}
       </div>
   )

   const showSuccess = ()=>(
    <div className="alert alert-info" style={{display: success? 'block':'none'}} >
       New Account is created.Please <Link to="/signIn">Signin</Link> 
    </div>
   )

  return (
    <Layout title="Sign Up" description="Sign Up to Node React E-commerce App" className="container col-md-8 offset-md-2" >
      {showSuccess()} 
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default SignUp;
