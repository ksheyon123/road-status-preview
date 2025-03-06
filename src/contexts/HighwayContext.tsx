/**
 * HighwayContext.tsx
 *
 * 고속도로 정보를 관리하는 Context입니다.
 * 애플리케이션 전체에서 고속도로 데이터에 접근할 수 있도록 합니다.
 * 고속도로 목록을 가져오고, 현재 선택된 고속도로를 관리합니다.
 */

import { createContext, useContext, useEffect, useState } from "react";
import { HighwayInfo } from "@/types/index";
import { get } from "@/https";
import { ApiError } from "@/types/https";
import { getHighways } from "@/https/apis";

/**
 * HighwayContext에서 제공하는 값들의 타입 정의
 */
interface HighwayContextType {
  highways: HighwayInfo["highways"]; // 모든 고속도로 정보 배열
  isLoading: boolean; // 데이터 로딩 상태
  error: ApiError | null; // 에러 정보
  updateHighway: Function; // 현재 고속도로 업데이트 함수
  curHighway: HighwayInfo["highways"][number] | null; // 현재 선택된 고속도로
}

/**
 * 고속도로 정보를 관리하는 Context
 * 기본값으로 빈 배열과 초기 상태를 설정합니다.
 */
const HighwayContext = createContext<HighwayContextType>({
  highways: [],
  isLoading: false,
  error: null,
  updateHighway: () => {},
  curHighway: null,
});

/**
 * 고속도로 Context Provider 컴포넌트
 * 고속도로 데이터를 가져와서 자식 컴포넌트에 제공합니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 자식 컴포넌트
 */
export function HighwayProvider({ children }: { children: React.ReactNode }) {
  const [highways, setHighways] = useState<HighwayInfo["highways"]>([]); // 전체 고속도로 목록
  const [curHighway, setCurHighway] = useState<
    HighwayInfo["highways"][number] | null
  >(null); // 현재 고속도로
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<ApiError | null>(null); // 에러 상태

  /**
   * 컴포넌트 마운트 시 고속도로 데이터를 가져옵니다.
   */
  useEffect(() => {
    /**
     * API에서 고속도로 정보를 가져오는 비동기 함수
     */
    async function fetchHighways() {
      try {
        setIsLoading(true);
        const { data } = await getHighways(); // API 호출
        setCurHighway(data.highways[0]); // 첫 번째 고속도로를 기본값으로 설정
        setHighways(data.highways); // 모든 고속도로 정보 저장
      } catch (err) {
        // 에러 처리
        setError(
          err instanceof ApiError
            ? err
            : new ApiError(500, null, "Unknown error occurred")
        );
      } finally {
        setIsLoading(false); // 로딩 상태 종료
      }
    }

    fetchHighways();
  }, []);

  /**
   * 현재 선택된 고속도로를 업데이트하는 함수
   *
   * @param {HighwayInfo["highways"][number]} e - 선택된 고속도로 객체
   */
  const updateHighway = (e: HighwayInfo["highways"][number]) =>
    setCurHighway(e);

  return (
    <HighwayContext.Provider
      value={{ highways, isLoading, error, updateHighway, curHighway }}
    >
      {!isLoading ? <>{children}</> : <>Loading</>}
    </HighwayContext.Provider>
  );
}

/**
 * 고속도로 Context를 사용하기 위한 커스텀 훅
 * 컴포넌트에서 고속도로 데이터에 쉽게 접근할 수 있도록 합니다.
 *
 * @returns {HighwayContextType} 고속도로 Context 값
 * @throws {Error} Provider 외부에서 사용될 경우 에러 발생
 */
export function useHighwayContext() {
  const context = useContext(HighwayContext);
  if (context === undefined) {
    throw new Error("useHighway must be used within a HighwayProvider");
  }
  return context;
}
