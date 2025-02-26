import { createContext, useContext, useEffect, useState } from "react";
import { HighwayInfo } from "@/types/index";
import { get } from "@/https";
import { ApiError } from "@/types/https";
import { getHighways } from "@/https/apis";

interface HighwayContextType {
  highways: HighwayInfo["highways"];
  isLoading: boolean;
  error: ApiError | null;
  updateHighway: Function;
  curHighway: HighwayInfo["highways"][number] | null;
}

const HighwayContext = createContext<HighwayContextType>({
  highways: [],
  isLoading: false,
  error: null,
  updateHighway: () => {},
  curHighway: null,
});

export function HighwayProvider({ children }: { children: React.ReactNode }) {
  const [highways, setHighways] = useState<HighwayInfo["highways"]>([]); // 전체 고속도로 목록
  const [curHighway, setCurHighway] = useState<
    HighwayInfo["highways"][number] | null
  >(null); // 현재 고속도로
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    async function fetchHighways() {
      try {
        setIsLoading(true);
        const { data } = await getHighways();
        setCurHighway(data.highways[0]);
        setHighways(data.highways);
      } catch (err) {
        setError(
          err instanceof ApiError
            ? err
            : new ApiError(500, null, "Unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchHighways();
  }, []);

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

export function useHighwayContext() {
  const context = useContext(HighwayContext);
  if (context === undefined) {
    throw new Error("useHighway must be used within a HighwayProvider");
  }
  return context;
}
