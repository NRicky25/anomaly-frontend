import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const fetchDashboardData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/data`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
};

export const getReports = async (page, pageSize, filters) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/transactions`, {
      params: {
        page: page,
        page_size: pageSize,
        min_amount: filters.min_amount,
        max_amount: filters.max_amount,
        is_fraud: filters.is_fraud,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};
