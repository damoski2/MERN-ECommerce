import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getBraintreeClientToken } from "./apiCore.js";
import { Card } from "./Card";
import { Search } from "./Search";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from 'braintree-web-drop-in-react';

export const Checkout = ({ products }) => {

  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  })

  const userId = isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token

  const getToken = (userId, token)=>{
    getBraintreeClientToken(userId, token).then(data=>{
      if(data.error){
        setData({ ...data, error: data.error })
      }else{
        setData({ ...data, clientToken: data.clientToken })
      }
    })
  }

  useEffect(()=>{
    getToken(userId, token)
  },[])

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckOut = ()=>{
      return (
        isAuthenticated() ? (
            <div>{showDropIn()}</div>
          ) : (
            <Link to="/signin" >
              <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
          )
      )
  }

  const buy = ()=>{
    //send the nonce to your server
    //nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
    .then(data=>{
      console.log(data)
      nonce = data.nonce;
      // once you have nonce(card type, crad number) send nonce as 'paymentMethodNonce'
      //and also total to be charged
      console.log('send nonce and total to process: ', nonce, getTotal(products))
    })
    .catch(err=>{
      console.log('droppin error: ',err)
      setData({...data, error: err.message })
    })
  }

  const showError = error =>{
    return(
      <div className="alert alert-danger" style={{display: error? '':'none'}} >
        {error}
      </div>
    )
  }

  const showDropIn = ()=>(
    <div onBlur={()=> setData({ ...data, error:''}) } >
      {data.clientToken !== null && products.length > 0?(
        <div>
          <DropIn options={{
            authorization: data.clientToken
          }} onInstance={instance => (data.instance = instance) } />
          <button onClick={buy} className="btn btn-success" >Pay</button>
        </div>
      ):null}
    </div>
  )

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showError(data.error)}
      {showCheckOut()}
    </div>
  );
};
