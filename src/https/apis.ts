import { AccidentInfo, HighwayInfo, RouteInfo } from "@/types/index";
import { get } from "@/https/index";

const getHighways = async () => {
  try {
    const baseUrl =
      typeof window === "undefined" ? `${process.env.NEXT_PUBLIC_API_URL}` : "";
    return await get<HighwayInfo>(`${baseUrl}/api/highways`, {
      timeout: 10000,
    });
  } catch (e) {
    throw e;
  }
};

const getRoutes = async (id: string) => {
  try {
    const config = {};
    const baseUrl =
      typeof window === "undefined" ? `${process.env.NEXT_PUBLIC_API_URL}` : "";
    return await get<RouteInfo>(`${baseUrl}/api/routes/${id}`, config);
  } catch (e) {
    throw e;
  }
};

const getAccidents = async () => {
  try {
    const baseUrl =
      typeof window === "undefined" ? `${process.env.NEXT_PUBLIC_API_URL}` : "";
    return await get<AccidentInfo>(`${baseUrl}/api/accidents`, {
      timeout: 10000,
    });
  } catch (e) {
    throw e;
  }
};

export { getHighways, getRoutes, getAccidents };
