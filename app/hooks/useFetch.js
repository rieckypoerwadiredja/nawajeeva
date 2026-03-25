import { useEffect, useState } from "react";
import callApi from "@/app/utils/callApi";

export default function useFetch({
  url,
  method = "GET",
  body = null,
  deps = [],
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (showLoading = false) => {
    try {
      // hanya loading saat pertama kali
      if (showLoading || data === null) {
        setLoading(true);
      }

      setError(null);

      const response = await callApi({
        url,
        method,
        body,
      });

      if (response.status === "error") {
        throw new Error(response.message || "Request failed");
      }

      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      if (showLoading || data === null) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData(true); // first load
  }, deps);

  return { data, loading, error, refetch: fetchData };
}
