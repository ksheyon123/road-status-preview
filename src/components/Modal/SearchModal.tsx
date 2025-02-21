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

interface Highway {
  id: string;
  name: string;
}

interface IProps {}

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
          width="100%"
          height="100%"
          iconClass="mx-[10px] w-[24px] h-[24px] "
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
            <Image
              width={20}
              height={20}
              className="mr-5"
              src={Highway.src}
              alt="highway"
            />
            <span className="text-[#000] text-[16px]">{item.route_name}</span>
          </div>
        )}
      />
    </div>
  );
};

export default SearchModal;
