/**
 * SearchModal.tsx
 *
 * 고속도로 검색 모달 컴포넌트입니다.
 * 고속도로 목록을 검색하고 선택할 수 있는 기능을 제공합니다.
 */

import React, { useState, ChangeEvent, useEffect } from "react";
import BasicInput from "@/components/Input/BasicInput";
import List from "@/components/List/List";
import Button from "@/components/Button/Button";
import Image from "next/image";
import ArrowLeftIcon from "@/assets/images/arrows_button_left__arrow.png";
import SearchIcon from "@/assets/images/search__glass_search_magnifying__Streamline_Core.png";
import Highway from "@/assets/images/highway.png";
import { useModalContext } from "@/contexts/ModalContext";
import { HighwayInfo } from "@/types/index";
import { get } from "@/https";
import { useHighwayContext } from "@/contexts/HighwayContext";

/**
 * 고속도로 정보 인터페이스
 *
 * @interface Highway
 * @property {string} id - 고속도로 ID
 * @property {string} name - 고속도로 이름
 */
interface Highway {
  id: string;
  name: string;
}

/**
 * 검색 모달 컴포넌트의 Props 인터페이스
 *
 * @interface IProps
 */
interface IProps {}

/**
 * 검색 모달 컴포넌트
 *
 * 고속도로 목록을 검색하고 선택할 수 있는 모달 컴포넌트입니다.
 * 검색 기능과 고속도로 목록을 표시합니다.
 *
 * @param {IProps} props - 검색 모달 컴포넌트 props
 * @returns {JSX.Element} 검색 모달 컴포넌트 JSX 요소
 */
const SearchModal: React.FC<IProps> = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [highways, setHighways] = useState<HighwayInfo["highways"]>([]);
  const [filtered, setFiltered] = useState<HighwayInfo["highways"]>([]);
  const { closeModal } = useModalContext();
  const { updateHighway } = useHighwayContext();
  useEffect(() => {
    const fetchHighways = async () => {
      try {
        const { data } = await get<HighwayInfo>("/api/highways");
        const { highways } = data;
        setHighways(highways);
        setFiltered(highways);
      } catch (error) {
        console.error("고속도로 데이터를 불러오는데 실패했습니다:", error);
      }
    };

    fetchHighways();
  }, []);

  /**
   * 검색 이벤트 핸들러
   *
   * 입력 값에 따라 고속도로 목록을 필터링합니다.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - 입력 변경 이벤트
   */
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    // 검색어를 기반으로 고속도로 필터링
    const filtered = highways.filter((highway) =>
      highway.route_name.includes(value)
    );
    setFiltered(filtered);
  };

  return (
    <div className="w-screen h-screen bg-white">
      <div className="h-10 flex items-center py-2 px-4 border-b border-[#EEE]">
        <div
          className="mr-2 w-4 h-4 cursor-pointer"
          onClick={() => closeModal()}
        >
          <Image width={16} height={16} src={ArrowLeftIcon.src} alt="back" />
        </div>
        <BasicInput
          value={searchText}
          width="calc(100vw - 80px)"
          height="100%"
          onChange={handleSearch}
          placeholder="고속도로 검색"
          className="w-full h-full bg-[#F5F5F5] rounded-sm border-none placeholder-[14px] py-1 px-2"
        />
        <div className="ml-2 w-4 h-4 cursor-pointer">
          <Image
            className=""
            width={16}
            height={16}
            src={SearchIcon.src}
            alt="search"
          />
        </div>
      </div>
      <List
        className="h-[calc(100vh-62px)] overflow-auto"
        items={filtered}
        children={(item, index) => (
          <div
            key={index}
            className="flex py-[2px] pl-[16px] pr-[8px] items-center cursor-pointer h-[40px]"
            onClick={() => {
              updateHighway(item);
              closeModal();
            }}
          >
            <div className="relative w-5 h-5 mr-2">
              <Image
                width={20}
                height={20}
                className="mr-5"
                src={Highway.src}
                alt="highway"
              />
              <div className="absolute top-[1px] left-[-1px] w-5 h-5 flex justify-center items-center">
                <span
                  className="text-[#FFF] text-[6px] font-bold"
                  style={{ letterSpacing: -1 }}
                >
                  {item.route_display_id}
                </span>
              </div>
            </div>
            <span className="text-[#000] text-[16px]">{item.route_name}</span>
          </div>
        )}
      />
    </div>
  );
};

export default SearchModal;
