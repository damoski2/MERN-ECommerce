import React, { useEffect, useState } from "react";
import { Layout } from "../imports";
import { Redirect } from "react-router-dom";
import { signIn, authenticate, isAuthenticated } from "../auth";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "ryan@gmail.com",
    password: "johnnyCage1",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, success, error, loading, redirectToReferrer } =
    values;
  
  const {user} = isAuthenticated()

  const InputOnchange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signIn({ email, password }).then((data) => {
      console.log(data)
      if(data.error){
        setValues({ ...values, error: data.error, loading: false });
      }else{
        authenticate(data,()=>{
          setValues({ ...values, redirectToReferrer: true });
        })
      }
    });
  };

  const signInForm = () => (
    <form>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Email
        </label>
        <input
          name="email"
          value={email}
          onChange={InputOnchange("email")}
          type="email"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Password
        </label>
        <input
          name="password"
          value={password}
          onChange={InputOnchange("password")}
          type="password"
          className="form-control"
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "block" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

    const redirectUser =()=>{
      if(redirectToReferrer){
        if(user && user.role === 1){
          return <Redirect to="/admin/dashboard" />
        }else{
          return <Redirect to="/user/dashboard" />
        }
      }

      if(isAuthenticated()){
        return <Redirect to="/" />
      }
    }

  return (
    <Layout title="Sign In" description="Sign in to Node React E-commerce App">
      {showError()}
      {showLoading()}
      {signInForm()}
      {redirectUser()}
    </Layout>
  );
};

export default SignIn;
