import axios from "axios";

export const getAllProducts = () => {
  try {
    return axios.get(
      `${
        import.meta.env.VITE_BACKEND_API
      }/api/v1/GetTransactionData/AllTrasnaction?page=1&month=3&search=`
    );
  } catch (error) {
    return Error(error.message);
  }
};

export const getAllProductsByFilter = (data) => {
  try {
    const { month, search, page } = data;

    return axios.get(
      `${
        import.meta.env.VITE_BACKEND_API
      }/api/v1/GetTransactionData/AllTrasnaction?page=${page}&month=${month}&search=${search}`
    );
  } catch (error) {
    return Error(error.message);
  }
};

export const getAllProductsByStatsFilter = (data) => {
  try {
    const { month } = data;

    return axios.get(
      `${
        import.meta.env.VITE_BACKEND_API
      }/api/v1/GetTransactionData/GetAllData?month=${month}`
    );
  } catch (error) {
    return Error(error.message);
  }
};
