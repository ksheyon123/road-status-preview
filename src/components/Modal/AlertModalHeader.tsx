import { useModalContext } from "@/contexts/ModalContext";
import Image from "next/image";

import CloseIcon from "@/assets/images/xmark.png";
import HighwayIcon from "@/assets/images/highway.png";

const AlertModalHeader = () => {
  const { closeModal } = useModalContext();
  return (
    <div className="flex flex-col w-[500px] p-[10px] pb-[0px]">
      <div className="h-10">
        <div className="flex w-full">
          <div className="flex w-full h-5 items-center">
            <Image
              className="inline"
              width={20}
              height={20}
              src={HighwayIcon.src}
              alt="highway"
            />
            <span className="inline font-bold ml-1.5 text-[#000]">
              {"고속도로"}
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
