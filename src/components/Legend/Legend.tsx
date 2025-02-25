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
