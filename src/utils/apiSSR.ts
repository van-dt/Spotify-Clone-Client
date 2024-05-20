import axios from "axios";
import { cookies } from "next/headers";

type APIMethod = "get" | "post" | "put" | "delete";

export async function fetchSecureApiSSR<T>(
  method: APIMethod,
  path: string,
  data?: any
): Promise<T | undefined> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL!;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
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
