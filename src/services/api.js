import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_DEPLOYMENT;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-api-key": API_KEY,
  },
});

export const fetchDashboardData = async () => {
  try {
    const response = await apiClient.get("/dashboard/data");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
};

export const getReports = async (page, pageSize, filters) => {
  try {
    const response = await apiClient.get(
      `${API_BASE_URL}/reports/transactions`,
      {
        params: {
          page: page,
          page_size: pageSize,
          min_amount: filters.min_amount,
          max_amount: filters.max_amount,
          is_fraud: filters.is_fraud,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};

export const fetchAnalyticsData = async () => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}/analytics/trends`);
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
};

export const fetchSettings = async () => {
  const response = await apiClient.get(`${API_BASE_URL}/settings`);
  return response.data;
};

export const updateSettings = async (values) => {
  await axios.post(`${API_BASE_URL}/settings`, values);
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error(error.response?.data?.detail || "Something went wrong.");
  }
};
