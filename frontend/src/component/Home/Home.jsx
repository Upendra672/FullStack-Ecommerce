import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import MetaData from "../layout/MetaData";

const Product = {
  name: "Blue T-shirt",
  image: { url: "http://i.ibb.co/DRST11n/1.webp" },
  price: 400,
  _id: "upen",
};

const Home = () => {
  return (
    <>
      <MetaData title="ECOMMERCE" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <ProductCard product={Product} />
        <ProductCard product={Product} />
        <ProductCard product={Product} />
        <ProductCard product={Product} />
        <ProductCard product={Product} />
        <ProductCard product={Product} />
        <ProductCard product={Product} />
        <ProductCard product={Product} />
      </div>
    </>
  );
};

export default Home;
// {products &&
//           products.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
