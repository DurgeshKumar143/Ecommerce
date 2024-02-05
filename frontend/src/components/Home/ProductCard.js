import React from 'react'

import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

import "./productCard.css"
 

const ProductCard = ({product}) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
        edit:false,
        isHalf:true
        
      };
  return (
     <>
     <div className="box">
        <Link className='productCard' to={`/product/${product._id}`}>
        <img className='img' src={product.images[0].url} alt={product.name} />
        <p style={{textAlign:"center"}}>{product.name}</p>
        <p>{product.description}</p>
        <div>
            <ReactStars {...options} /> <span style={{marginLeft:"5px"}} >{`${product.numOfReviews} Revies`}</span>
        </div>
        <span  style={{textAlign:"center"}}>{`₹${product.price}`}</span>

        </Link>
        </div>
     </>
  )
}

export default ProductCard