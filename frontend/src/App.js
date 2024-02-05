 
import { useEffect } from 'react';
import './App.css';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import WebFont from "webfontloader"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.js"

import ProductDetail from "./components/Product/ProductDetails.js"
import Products from "./components/Product/Products.js"

 

import NavItem from './components/layout/header/NavItem.js';
 
 

function App() {
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })

  },[])
  return (
  <>

<BrowserRouter> 
 <NavItem/>
 {/* <Header/> */}
 
<Routes>

{/* <Route path="/Home" element={<Home/>}/> */}
<Route path="/" element={<Home/>}/>
<Route path="/product/:id" element={<ProductDetail/>}/>
<Route path="/products" element={<Products/>}/>
<Route path="/products/:keyword" element={<Products/>}/>
 
 
 


 


</Routes>   
<Footer />
</BrowserRouter>


     </>
  );
}

export default App;
