import axios, { AxiosError } from "axios";

const API = axios.create({ baseURL: process.env.SERVER_HOST });

API.interceptors.request.use((req) => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user") || "{}").user.accessToken
    }`;
  }
  return req;
});

export const loginUser = async (dataForm: any) => {
  try {
    const response = await API.post("/auth/login", dataForm);
    return response.data;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const updateUser = async (dataForm: any) => {
  try {
    const response = await API.put("/user/profile", dataForm);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

// export const updateAvatar = async (formData: any) => {
//   try {
//     const response = await API.post("/api/user/avatar", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response;
//   } catch (error) {
//     return (error as AxiosError).response;
//   }
// };

export const getMyOrders = async (
  status: string,
  limit: any = 10,
  page: any = 1
) => {
  try {
    const response = await API.get(
      `my-orders?status=${status}&limit=${limit}&page=${page}`
    );
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const signUpUser = async (dataForm: any) => {
  try {
    const response = await API.post("/auth/register", dataForm);
    return response.data;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const getUserById = async (userId: any) => {
  try {
    const response = await API.get(`/user/${userId}`);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const addCategory = async (category: any) => {
  try {
    const response = await API.post("/api/category", category);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const getCategories = async () => {
  try {
    const response = await API.get("/api/categories");
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await API.get("/products");
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const getProducts = async (params: any) => {
  try {
    const response = await API.get("/products", { params: params });
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const getProduct = async (productId: any) => {
  try {
    const response = await API.get(`/product/${productId}`);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const getOrderById = async (id: any) => {
  try {
    const response = await API.get(`order/${id}`);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const addtoCart = async ( params: any) => {
  try {
    const response = await API.post(`/cart`, params);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const removeFromCart = async (productId: any) => {
  try {
    const response = await API.delete(`/cart/${productId}`);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const addRating = async ( params: any) => {
  try {
    const response = await API.post(`/rating`, params);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const getRating = async (productId: any) => {
  try {
    const response = await API.get(`/rating/${productId}`);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const myCart = async () => {
  try {
    const response = await API.get(`cart`);
    return response;
  } catch (error) {
    return (error as AxiosError).response;
  }
};

export const createAnOrder = async (params: any) => {
  try {
    const response = await API.post(`/order`, params);
    return response;
  } catch (error) {
    // return (error as AxiosError).response;
    throw error;
  }
};
