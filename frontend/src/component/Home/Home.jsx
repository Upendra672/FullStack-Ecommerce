import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (<Loader/>):(
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
        {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
      </div>
    </>
      )}
    </>
  );
};

export default Home;

