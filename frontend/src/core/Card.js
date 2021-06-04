import React from 'react'
import { Link } from 'react-router-dom'
import { ShowImage } from './ShowImage'

export const Card = ({product}) => {
    return (
        <div className="col-4 mb-3" >
            <div className="card" >
                <div className="card-header" >{product.name}</div>
                <div className="card-body" >
                    <ShowImage item={product} url="product" />
                    <p>{product.description.substring(0,10)}</p>
                    <p>${product.price}</p>
                    <Link to="/" >
                        <button className="btn btn-outline-primary mt-2 mb-2" style={{marginRight:'10px'}} >
                            View product
                        </button>
                    </Link>
                    <button className="btn btn-outline-warning mt-2 mb-2" >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )

}

//export default Card
