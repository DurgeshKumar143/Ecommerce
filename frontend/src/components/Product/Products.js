import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css"
import { useSelector,useDispatch } from 'react-redux'
import { clearError,getProduct,getSearchProduct } from '../../actions/productAction'
import ProductCard from '../Home/ProductCard'
import Loader from '../layout/loader/Loader'
import Pagination from "react-js-pagination"
import { useParams } from 'react-router-dom'

const Products = ({match}) => {
    const dispatch=useDispatch();

    const [currentPage,setCurrentPage]=useState(1)
    const {products,loading,error,productsCount,resuiltPerPage}=useSelector(state=>state.products)
    //.getSearchProduct(state=>state.products)

     console.log("This is get Product section for ",getSearchProduct(state=>state.products))

   

    const setCurrentPageNo=(e)=>{
      setCurrentPage(e)
    }

    //const keywrd=match.params.keyword
    const {id}=useParams()
 
    useEffect(()=>{

        dispatch(getProduct(id))
         
      
    },[dispatch,id]);

  return (
    <Fragment>
    {loading ?<Loader/>:(<Fragment>
    <h1 className="productsHeading">Products</h1>

    <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className='paginationBox'>
          <Pagination
          activePage={currentPage}
          itemsCountPerPage={resuiltPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Pre"
          firstPageText="1st"
          lastPageText="Last"
          itemClass='page-item'
          linkClass='page-link'
          activeClass='pageItemActive'
          activeLinkClass='pageLinkActive' />

          </div>


    </Fragment>)}

    </Fragment>
  )
}

export default Products