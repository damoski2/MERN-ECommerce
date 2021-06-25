import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from './apiUser'
import moment from 'moment'

const UserDashBoard = () => {

    const [history, setHistory] = useState([])

    const init = (userId, token)=>{
        getPurchaseHistory(userId, token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setHistory(data)
            }
        })
    }

    const {user:{ _id, name, email, role } , token} = isAuthenticated()

    useEffect(()=>{
        init(_id, token)
    },[])

    const userLinks = ()=>{
        return (
            <div className="card" >
                <h4 className="card-header" >User Links</h4>
                <ul className="list-group">
                   <li className="list-group-item">
                       <Link className="nav-link" to="/cart" >My Cart</Link>
                   </li>
                   <li className="list-group-item">
                       <Link className="nav-link" to={`/profile/${_id}`} >Update Profile</Link>
                   </li>
               </ul>
            </div>
        )
    }

    const userInfo = ()=>{
        return (
            <div className="card mb-5">
               <h3 className="card-header" >User Information</h3>
               <ul className="list-group">
                   <li className="list-group-item">{name}</li>
                   <li className="list-group-item">{email}</li>
                   <li className="list-group-item">{role ===1? 'Admin':'Registered User'}</li>
               </ul>
           </div>
        )
    }
    const purchaseHistory = history =>{
        return (
            <div className="card mb-5" >
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h,i)=>{
                            return (
                                <div>
                                    {h.products.map((p,i)=>{
                                        return(
                                            <div key={i} >
                                                <h6>Product name: {p.name}</h6>
                                                <h6>Product price: ${p.price}</h6>
                                                <h6>
                                                    Purchase date: {" "}
                                                    {moment(p.createdAt).fromNow()}
                                                </h6>
                                                <hr />
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </li>
                </ul>
            </div>
        )
    }

    return (
       <Layout title="User DashBoard" description={`Good day ${name}`} className="container"  >
           <div className="row">
               <div className="col-3">
                    {userLinks()}
               </div>
               <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
               </div>
           </div>
       </Layout>
    )
}

export default UserDashBoard
