import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import BasicInput from "../Input/BasicInput";
import List from "../List/List";
import Button from "../Button/Button";
import Image from "next/image";
import ArrowLeft from "../../assets/images/arrows_button_left__arrow.png";
import Highway from "../../assets/images/highway.png";
import { useModalContext } from "@/contexts/ModalContext";
import { HighwayInfo } from "@/types/index";
import { get } from "@/https";

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
      <div className="h-[62px] flex items-center pt-[12px] pr-[0px] pb-[6px] pl-[12px] gap-2">
        <BasicInput
          value={searchText}
          width="100%"
          height="100%"
          iconClass="mx-[10px] w-[24px] h-[24px]"
          onChange={handleSearch}
          placeholder="고속도로"
          className="w-full h-full bg-[#F5F5F5] rounded-[22px] border-none placeholder-[14px]"
          icon={ArrowLeft.src}
        />
        <Button
          variant="text"
          onClick={closeModal}
          hover={false}
          className="w-[44px] text-gray-900 text-xl w-full h-full px-0"
        >
          취소
        </Button>
      </div>
      <List
        className="h-[calc(100vh-62px)] overflow-auto"
        items={filtered}
        children={(item, index) => (
          <div
            key={index}
            className="flex py-[2px] pl-[16px] pr-[8px] items-center cursor-pointer h-[40px]"
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
