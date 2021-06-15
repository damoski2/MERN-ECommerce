/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getBraintreeClientToken, processPayment, createOrder } from "./apiCore.js";
import { Card } from "./Card";
import { Search } from "./Search";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from 'braintree-web-drop-in-react';
import {emptyCart} from './cartHelpers';

export const Checkout = ({ products, setRun= f=>f, run=undefined }) => {

  const [data, setData] = useState({
    loading: false,
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
        setData({ clientToken: data.clientToken });
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

  const handleAddress = event=>{
    setData({...data, address: event.target.value})
  }


  let deliveryAddress = data.address;

  const buy = ()=>{
    setData({ loading: true });
    //send the nonce to your server
    //nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
    .then(data=>{
      //console.log(data)
      nonce = data.nonce;
      // once you have nonce(card type, crad number) send nonce as 'paymentMethodNonce'
      //and also total to be charged
      console.log('send nonce and total to process: ', nonce, getTotal(products))
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getTotal(products)
      }

      processPayment(userId, token, paymentData).then(response=>{
        //console.log(response)
        //empty cart
        //create order

        const createOrderData = {
          products: products,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount,
          address: deliveryAddress
        }

        createOrder(userId, token, createOrderData)
        .then(response=>{
          emptyCart(()=>{
            setRun(!run)
            console.log('payment success and empty cart');
            setData({ loading: false, success: true })
          });
        })
        .catch(err=> {
          console.log(err)
          setData({ loading: false })
        })
      });
    })
    .catch(err=>{
      //console.log('droppin error: ',err)
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

  const showSuccess = success =>{
    return(
      <div className="alert alert-info" style={{display: success? '':'none'}} >
        Thanks! Your payment was successful
      </div>
    )
  }

  const showLoading = (loading)=>(
    loading&& <h2>Loading...</h2>
  )

  const showDropIn = ()=>(
    <div onBlur={()=> setData({ ...data, error:''}) } >
      {data.clientToken !== null && products.length > 0?(
        <div>
          <div className="form-group mb-3" >
            <label className="text-muted">Delivery address:</label>
            <textarea 
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              type="text"
              placeholder="Type your delivery address here..."
            />
          </div>
          <DropIn options={{
            authorization: data.clientToken,
            paypal: {
              flow: "vault"
            }
          }} onInstance={instance => (data.instance = instance) } />
          <button onClick={buy} className="btn btn-success btn-block" style={{width:'100%'}}>Pay</button>
        </div>
      ):null}
    </div>
  )

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckOut()}
    </div>
  );
};
