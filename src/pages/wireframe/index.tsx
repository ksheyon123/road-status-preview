import { useState } from "react";
import { FiSearch, FiAlertCircle, FiChevronLeft, FiX } from "react-icons/fi";

export default function Page() {
  const [activeTab, setActiveTab] = useState("traffic");
  const [showSearch, setShowSearch] = useState(false);
  const [showAccidentPopup, setShowAccidentPopup] = useState(false);

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* 메인 화면 */}
      <div className="relative w-full h-full">
        {/* 헤더 */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4">
          <h1 className="text-xl font-bold">경부고속도로</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              마지막 업데이트: 12:30
            </span>
            <button onClick={() => setShowSearch(true)}>
              <FiSearch className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* 탭 메뉴 */}
        <div className="flex border-b bg-white">
          <button
            className={`flex-1 py-3 text-center ${
              activeTab === "traffic"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("traffic")}
          >
            실시간 교통 상태
          </button>
          <button
            className={`flex-1 py-3 text-center ${
              activeTab === "accident"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("accident")}
          >
            사고/공사 정보
          </button>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="overflow-auto h-[calc(100vh-8rem)] p-4">
          {activeTab === "traffic" ? (
            // 실시간 교통 상태 탭
            <div className="space-y-4">
              {/* 콘존 카드 */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between">
                    {/* 상행 */}
                    <div className="flex-1 border-r pr-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">양재IC → 판교IC</h3>
                        <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <div>평균 80km/h</div>
                        <div>소요시간 15분</div>
                      </div>
                    </div>
                    {/* 하행 */}
                    <div className="flex-1 pl-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">판교IC → 양재IC</h3>
                        <div className="bg-red-500 w-2 h-2 rounded-full"></div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <div>평균 30km/h</div>
                        <div>소요시간 25분</div>
                      </div>
                      <button
                        className="mt-2"
                        onClick={() => setShowAccidentPopup(true)}
                      >
                        <FiAlertCircle className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // 사고/공사 정보 탭
            <div className="space-y-4">
              <div className="font-medium mb-2">상행</div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">판교IC → 양재IC</h3>
                    <div className="mt-2 text-sm text-gray-600">
                      <div>사고 발생</div>
                      <div>시작: 12:00</div>
                      <div>예상 종료: 13:00</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm">
                    진행중
                  </span>
                </div>
              </div>

              <div className="font-medium mb-2 mt-6">하행</div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">양재IC → 서초IC</h3>
                    <div className="mt-2 text-sm text-gray-600">
                      <div>도로 보수 공사</div>
                      <div>시작: 11:00</div>
                      <div>예상 종료: 16:00</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded text-sm">
                    진행중
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 검색 모달 */}
      {showSearch && (
        <div className="absolute inset-0 bg-white z-10">
          <div className="h-16 border-b flex items-center px-4 gap-4">
            <button onClick={() => setShowSearch(false)}>
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <input
              type="text"
              placeholder="고속도로 이름을 입력하세요"
              className="flex-1 h-10 px-3 border rounded"
            />
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded">중부고속도로</div>
              <div className="p-3 bg-gray-50 rounded">영동고속도로</div>
              <div className="p-3 bg-gray-50 rounded">서해안고속도로</div>
            </div>
          </div>
        </div>
      )}

      {/* 사고/공사 정보 팝업 */}
      {showAccidentPopup && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-medium">사고 상세 정보</h3>
              <button onClick={() => setShowAccidentPopup(false)}>
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">위치</div>
                  <div>판교IC → 양재IC (하행)</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">유형</div>
                  <div>추돌 사고</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">발생 시각</div>
                  <div>12:00</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">예상 종료 시각</div>
                  <div>13:00</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">우회 정보</div>
                  <div>분당-내곡간 도로 이용 권장</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  return {
    props: {},
  };
}
