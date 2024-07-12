import axios from "axios";
import { getCookie } from "cookies-next";

type APIMethod = "get" | "post" | "put" | "delete";

export async function fetchSecureApi<T>(
  method: APIMethod,
  path: string,
  data?: any
): Promise<T | undefined> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL!;
  const token = getCookie("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    switch (method) {
      case "get": {
        const res = await axios.get(`${apiBaseUrl}/${path}`, {
          headers,
        });
        return res.data.data as T;
      }
      case "post": {
        const res = await axios.post(`${apiBaseUrl}/${path}`, data, {
          headers,
        });
        return res.data.data as T;
      }
      case "put": {
        const res = await axios.put(`${apiBaseUrl}/${path}`, data, {
          headers,
        });
        return res.data.data as T;
      }
      case "delete": {
        const res = await axios.delete(`${apiBaseUrl}/${path}`, {
          headers,
        });
        return res.data.data as T;
      }
    }
  } catch (error) {
    console.error("Api Error:", error);
  }
}

export async function fetchPublicApi<T>(
  method: APIMethod,
  path: string,
  data?: any
): Promise<T | undefined> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL!;
  try {
    switch (method) {
      case "get": {
        const res = await axios.get(`${apiBaseUrl}/${path}`);
        return res.data.data as T;
      }
      case "post": {
        const res = await axios.post(`${apiBaseUrl}/${path}`, data);
        return res.data.data as T;
      }
      case "put": {
        const res = await axios.put(`${apiBaseUrl}/${path}`, data);
        return res.data.data as T;
      }
      case "delete": {
        const res = await axios.delete(`${apiBaseUrl}/${path}`);
        return res.data.data as T;
      }
    }
  } catch (error) {
    console.error("Api Error:", error);
  }
}
