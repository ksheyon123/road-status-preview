/**
 * 고속도로, 경로 및 사고 데이터를 가져오는 API 함수들
 * 이 파일은 백엔드 API 엔드포인트에 HTTP 요청을 보내는 함수들을 포함하고 있습니다.
 */
import { AccidentInfo, HighwayInfo, RouteInfo } from "@/types/index";
import { get } from "@/https/index";

/**
 * 모든 고속도로에 대한 정보를 가져옵니다.
 * @returns {Promise<HighwayInfo>} 고속도로 정보를 담은 Promise 객체
 * @throws API 요청이 실패할 경우 에러를 던집니다.
 */
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

/**
 * 특정 고속도로의 경로 정보를 가져옵니다.
 * @param {string} id - 고속도로 ID
 * @returns {Promise<RouteInfo>} 경로 정보를 담은 Promise 객체
 * @throws API 요청이 실패할 경우 에러를 던집니다.
 */
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

/**
 * 사고 정보를 가져옵니다.
 * @returns {Promise<AccidentInfo>} 사고 정보를 담은 Promise 객체
 * @throws API 요청이 실패할 경우 에러를 던집니다.
 */
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
