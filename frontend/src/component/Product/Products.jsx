import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PaginationItem } from "@mui/material";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  // let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {/* {resultPerPage < productsCount && (
           
          )} */}
          {/* <div className="paginationBox">
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(productsCount / resultPerPage)}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPageNo(page)}
                  shape="rounded"
                  variant='outlined'
                />
              </Stack>
            </div> */}
          <div className="paginationBox">
            <Stack spacing={2} direction="row">
              <Pagination
                count={Math.ceil(productsCount / resultPerPage)}
                page={currentPage}
                onChange={(event, page) => setCurrentPageNo(page)}
                shape="rounded"
                variant="outlined"
                color="primary" // Customize color
                size="large" // Customize size
                siblingCount={1} // Number of visible page links on either side of the current page
                boundaryCount={2} // Number of boundary links at the start and end
                showFirstButton // Show the "First" button
                showLastButton // Show the "Last" button
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    component={Link} // Customize the component used for each item (e.g., Link from react-router-dom)
                    to={`/products?page=${item.page}`} // Example link based on page number
                  />
                )}
              />
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
