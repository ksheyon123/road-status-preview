/**
 * Legend.tsx
 *
 * 교통 상황 범례 컴포넌트입니다.
 * 원활, 서행, 정체 상태를 색상으로 구분하여 표시합니다.
 */

/**
 * 범례 컴포넌트
 *
 * 교통 상황을 색상으로 구분하여 표시하는 범례 컴포넌트입니다.
 * 원활(녹색), 서행(주황색), 정체(빨간색)의 상태를 표시합니다.
 *
 * @returns {JSX.Element} 범례 컴포넌트 JSX 요소
 */
const Legend = () => {
  return (
    <div className="flex gap-4 p-4 text-sm text-[#000] bg-white border-t">
      <div className="flex items-center gap-2">
        <div className="w-8 h-1" style={{ backgroundColor: "#03bd41" }}></div>
        <span>원활</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-1" style={{ backgroundColor: "#ffac00" }}></div>
        <span>서행</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-1" style={{ backgroundColor: "#d80f17" }}></div>
        <span>정체</span>
      </div>
    </div>
  );
};

export default Legend;
