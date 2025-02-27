import { useModalContext } from "@/contexts/ModalContext";
import Image from "next/image";

import CloseIcon from "@/assets/images/xmark.png";
import HighwayIcon from "@/assets/images/highway.png";
import { useHighwayContext } from "@/contexts/HighwayContext";

const AlertModalHeader = () => {
  const { closeModal } = useModalContext();
  const { curHighway } = useHighwayContext();
  const { route_display_id, route_name } = curHighway || {
    route_display_id: "",
    route_name: "",
  };
  return (
    <div className="flex flex-col w-[500px] p-[10px] pb-[0px]">
      <div className="h-10">
        <div className="flex w-full">
          <div className="flex w-full h-5 items-center">
            <div className="relative w-5 h-5">
              <Image
                className="inline"
                width={20}
                height={20}
                src={HighwayIcon.src}
                alt="highway"
              />
              <div className="absolute top-[6px] left-0 flex justify-center items-center w-5 h-5 text-[#FFF] text-[10px] font-bold">
                <span>{route_display_id}</span>
              </div>
            </div>
            <span className="inline font-bold ml-1.5 text-[#000]">
              {route_name}고속도로
            </span>
          </div>
          <div className="w-4 h-4">
            <Image
              className="inline cursor-pointer"
              onClick={closeModal}
              width={16}
              height={16}
              src={CloseIcon.src}
              alt="close"
            />
          </div>
        </div>
        <div className="pl-[26px] text-sm text-[#000]">서울방향</div>
      </div>
    </div>
  );
};

export default AlertModalHeader;
