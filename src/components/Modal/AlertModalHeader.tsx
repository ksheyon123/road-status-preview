/**
 * AlertModalHeader.tsx
 *
 * 알림 모달의 헤더 컴포넌트입니다.
 * 고속도로 정보와 방향을 표시하고 닫기 버튼을 제공합니다.
 */

import { useModalContext } from "@/contexts/ModalContext";
import Image from "next/image";

import CloseIcon from "@/assets/images/xmark.png";
import HighwayIcon from "@/assets/images/highway.png";
import { useHighwayContext } from "@/contexts/HighwayContext";

/**
 * 알림 모달 헤더 컴포넌트의 Props 인터페이스
 *
 * @interface IProps
 * @property {"s" | "e"} direction - 방향 ("s": 시작점 방향, "e": 종점 방향)
 */
interface IProps {
  direction: "s" | "e";
}

/**
 * 알림 모달 헤더 컴포넌트
 *
 * 알림 모달의 상단에 표시되는 헤더 컴포넌트입니다.
 * 고속도로 정보, 방향, 닫기 버튼을 포함합니다.
 *
 * @param {IProps} props - 알림 모달 헤더 컴포넌트 props
 * @returns {JSX.Element} 알림 모달 헤더 컴포넌트 JSX 요소
 */
const AlertModalHeader = ({ direction }: IProps) => {
  const { closeModal } = useModalContext();
  const { curHighway } = useHighwayContext();
  const { route_display_id, route_name, start_point, end_point } =
    curHighway || {
      route_display_id: "",
      route_name: "",
      start_point: "",
      end_point: "",
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
        <div className="pl-[26px] text-sm text-[#000]">
          {direction === "s" ? start_point : end_point}방향
        </div>
      </div>
    </div>
  );
};

export default AlertModalHeader;
