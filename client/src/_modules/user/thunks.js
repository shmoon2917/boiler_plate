import createAsyncThunk from "../../_lib/createAsyncThunk";
import AuthService from "../../_services/auth.service";
import ProductService from "../../_services/product.service";
import { userConstants } from "./constants";

export const loginUserThunk = createAsyncThunk(
  userConstants.LOGIN_REQUEST,
  AuthService.login
);

export const registerUserThunk = createAsyncThunk(
  userConstants.REGISTER_REQUEST,
  AuthService.register
);

export const addToCartThunk = createAsyncThunk(
  userConstants.ADD_TO_CART,
  AuthService.addToCart
);

export const removeCartItemThunk = createAsyncThunk(
  userConstants.REMOVE_CART_ITEM,
  AuthService.removeCartItem
);

export const getCartItemsThunk = createAsyncThunk(
  userConstants.GET_CART_ITEMS,
  ProductService.getCartItems
);

export const logoutUserThunk = createAsyncThunk(
  userConstants.LOGOUT_REQUEST,
  AuthService.logout
);

export const authUserThunk = createAsyncThunk(
  userConstants.AUTH_USER,
  AuthService.auth
);
