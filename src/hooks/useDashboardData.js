import { useState, useEffect } from "react";
import { fetchDashboardData } from "../services/api";

const useDashboardData = () => {
  const [data, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDashboardData(
          // Correct URL: point to the data endpoint, not the docs.
          "http://127.0.0.1:8000/dashboard/data"
        );
        setDashboardData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { data, loading, error };
};

export default useDashboardData;
