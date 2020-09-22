import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsThunk, removeCartItemThunk } from "../../../_modules/user";
import { UserCardBlock } from "./Sections";
import PayPal from "../../../_components/PayPal";

function CartPage({ user }) {
  const [Total, setTotal] = useState(0);
  const products = useSelector((state) => state.user.cartDetail.data) || null;
  const dispatch = useDispatch();
  useEffect(() => {
    let cartItemIds = [];

    if (user && user.cart) {
      user.cart.forEach((item) => {
        cartItemIds.push(item.id);
      });

      const body = {
        ids: cartItemIds,
        cart: user.cart,
      };
      dispatch(getCartItemsThunk(body));
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (products) {
      calculateTotal();
    }
  }, [products]);

  const calculateTotal = () => {
    const sum = products.reduce(
      (acc, cur) => acc + cur.quantity * cur.price,
      0
    );

    setTotal(sum);
  };

  const removeFromCart = (productId) => () => {
    // dispatch(removeCartItemThunk(productId));
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock products={products} removeItem={removeFromCart} />
      </div>

      {products && (
        <>
          <div style={{ marginTop: "3rem" }}>
            <h2>Total Amount: ${Total}</h2>
          </div>

          <PayPal total={Total} />
        </>
      )}
    </div>
  );
}

export default CartPage;
