import React, { Fragment, useEffect } from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css"
import Metadata from '../layout/Metadata.js'
import ProductCard from "./ProductCard.js"

import {clearError, getProduct}from "../../actions/productAction.js"
import {useSelector,useDispatch} from "react-redux"
import Loader from '../layout/loader/Loader.js'
import { useAlert } from 'react-alert'


const Home = () => {
  const alert=useAlert()
  const dispatch =useDispatch()

  const {loading,error,products,productsCounts}=useSelector(state=>state.products)


  useEffect(()=>{
    if(error){
     
       alert.error(error)
       dispatch(clearError())
    }
    dispatch(getProduct())

  },[dispatch,error,alert])
  return (
    <Fragment>
      {loading  ? (<Loader/>):(<Fragment>

<Metadata title="ECOMMERCE"/>
<div className="banner">
    <p>Welcome To Ecommerce</p>
    <h1>FIND AMAZING PRODUCTS BELOW </h1>
    <a href="#container">
        <button>
        Scroll
        <CgMouse/>
        
        </button>
    </a>
</div>

<h2 className='homeHeading'>Feature Products</h2>

<div className="container" id="container">

{products && products.map((product,i)=>(
  <ProductCard product={product} key={i} />
  

))}

</div>


</Fragment>)}
    </Fragment>
  )
}

export default Home