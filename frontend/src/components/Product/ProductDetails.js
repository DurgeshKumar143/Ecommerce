import React, { Fragment, useEffect, useState } from "react";

import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";

import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";

import ReviewCard from "./ReviewCard.js"
import Loader from "../layout/loader/Loader.js";

import {useAlert} from "react-alert"

const ProductDetails = ({ match }) => {
    const params = useParams();

    const dispatch = useDispatch();

    const alert=useAlert();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        if(error){
        alert.error(error);
        dispatch(clearError())
        }
        dispatch(getProductDetails(params.id));
    }, [dispatch, params,error,alert]);

    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
        edit: false,
        isHalf: true,
    };

    const [quantity, setQuantity] = useState(1)

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);



    }

    return (
       <Fragment>
        {loading ? <Loader/>:( <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousel>
                        {product.images &&
                            product.images.map((item, i) => (
                                <img
                                    src={item.url}
                                    className="CarouselImage"
                                    key={item.url}
                                    alt={`${i},Slide`}
                                />
                            ))}
                    </Carousel>
                </div>

                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p> {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <ReactStars {...options} />

                        <span>({product.numOfReviews} Revies)</span>
                    </div>

                    <div className="detailsBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button onClick={decreaseQuantity}> - </button>
                                <input readOnly type="number" value={quantity} />
                                <button onClick={increaseQuantity}> + </button>
                            </div>{" "}
                            <button> Add to Card</button>
                        </div>
                        <p>
                            Status:{" "}
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Description:<p>{product.description}</p>
                    </div>

                    <button className="submitReview"> Submit Review </button>
                </div>
            </div>


            <h3 className="reviewsHeading">REVIEWS</h3>


            {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                    {product.reviews && product.reviews.map((review)=><ReviewCard  reviews={review}  key={review._id}/>)}
                </div>
            ):(<p className="noReviews">No Reviews </p>)}

             

        </Fragment>)}
       </Fragment>
    );
};

export default ProductDetails;
