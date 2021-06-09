import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ShowImage } from "./ShowImage";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import moment from "moment";

export const Card = ({
  product,
  showViewProductBtn,
  showAddtoCartBtn = true,
  cartUpdate = false,
  showremoveProductBtn = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductBtn) =>
    showViewProductBtn && (
      <Link to={`/product/${product._id}`} className="mr-2">
        <button className="btn btn-outline-primary mt-2 mb-2">
          View Product
        </button>
      </Link>
    );

  const showAddToCartButton = (showAddtoCartBtn) => {
    return (
      showAddtoCartBtn && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2 ml-2"
        >
          Add to cart
        </button>
      )
    );
  };

  const showRemoveButton = (showremoveProductBtn) => {
    return (
      showremoveProductBtn && (
        <button
          onClick={()=> removeItem(product._id) }
          className="btn btn-outline-danger mt-2 mb-2 ml-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const showCartUpdateOpt = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showStock = (quantity) =>
    quantity > 0 ? (
      <span
        className="badge badge-primary badge-pill"
        style={{ background: "#2d1afc" }}
      >
        In Stock
      </span>
    ) : (
      <span
        className="badge badge-primary badge-pill"
        style={{ background: "#2d1afc" }}
      >
        Out of stock
      </span>
    );

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p className=" lead mt-2">{product.description.substring(0, 10)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showViewButton(showViewProductBtn)}
        {showCartUpdateOpt(cartUpdate)}
        {showStock(product.quantity)}
        <br />
        {showAddToCartButton(showAddtoCartBtn)}
        {showRemoveButton(showremoveProductBtn)}
      </div>
    </div>
  );
};

//export default Card
