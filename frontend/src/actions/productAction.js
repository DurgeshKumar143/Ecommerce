import axios from "axios"
import {ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST, CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,PRODUCT_SEARCH_REQUEST,PRODUCT_SEARCH_SUCCESS
,
PRODUCT_SEARCH_FAIL} from "../constants/productConstants"


export const getProduct=(keyword="")=>async(dispatch)=>{
   
    try {
        dispatch({type:ALL_PRODUCT_REQUEST});

        const link=`/api/v1/products?keyword=${keyword}`

        // console.log("This is  link section",link)

        // const {data}=await axios.get(`/api/v1/products`);
        const {data}=await axios.get(`${link}`);

        console.log("This is  product list section",data);
        

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        });
        
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message,
        })
        
    }
}


export const getSearchProduct=(keyword)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_SEARCH_REQUEST});
        const link=`/api/v1/products?keyword=${keyword}`

console.log("THis is searching for the webapge",link)
        const {data}=await axios.get(`${link}`);

        dispatch({
            type:PRODUCT_SEARCH_SUCCESS,
            payload:data,
        });

    }catch(error){
        dispatch({
            type:PRODUCT_SEARCH_FAIL,
            payload:error.response.data.message
        })
    }
}



export const getProductDetails=(id)=>async(dispatch)=>{
    
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});
         const {data}=await axios.get(`/api/v1/product/${id}`)
        
         


        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        })
        
    } catch (error) {
         console.log("This is error")
        
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })

        
    }

}



// Cleaning Error 
export const clearError=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS })
}