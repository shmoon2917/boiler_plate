import axios from "axios";

const API_URL = "/api/product";

const registerProduct = async (body) => {
  try {
    const response = await axios.post(API_URL, body);
    const data = await handleResponse(response);

    return data;
  } catch (error) {
    throw error;
  }
};

const getProducts = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/products`, body);
    const data = await handleResponse(response);

    return data;
  } catch (error) {
    throw error;
  }
};

const getProductsById = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/products_by_id?id=${id}&type=single`
    );
    const data = await handleResponse(response);

    return data;
  } catch (error) {
    throw error;
  }
};

const handleResponse = (response) => {
  const { status, message, data } = response.data;

  if (status !== "ok") {
    const error = message;
    return Promise.reject(error);
  }

  return Promise.resolve(data);
};

export default {
  registerProduct,
  getProducts,
  getProductsById,
};
