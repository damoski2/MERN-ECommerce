import React from 'react'
import '../style.css'

export const ShowImage = ({ item, url }) => {
    return (
            <div className="product-img" >
                <img className="mb-3" src={`http://localhost:8000/api/${url}/photos/${item._id}`} alt={item.name} style={{maxHeight:'100%',maxWidth:'100%'}} />
            </div>
    )
}


