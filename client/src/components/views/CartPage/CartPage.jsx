import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItemsThunk } from "../../../_modules/user";

function CartPage({ user }) {
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
  }, []);

  return <div>car</div>;
}

export default CartPage;
