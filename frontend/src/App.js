import { useEffect } from 'react';
import './App.css';
import { Toaster } from "react-hot-toast";
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from "webfontloader";
import Home from "./component/Home/Home.jsx";
import ProductDetails from "./component/Product/ProductDetails.jsx";
import Products from "./component/Product/Products.jsx";

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);



  return (
    <Router>
   <Header/>
   <Toaster position="top-center" reverseOrder={false}/>
   <Routes>
    <Route  path="/" element={<Home/>}/>
    <Route  path="/product/:id" element={<ProductDetails/>} />
    <Route  path="/products" element={<Products/>} />

    
   </Routes>
   <Footer/>
    </Router>
  );
}

export default App;
