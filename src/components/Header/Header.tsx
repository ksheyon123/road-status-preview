import arrowLeft from "@/assets/images/arrows_button_left__arrow.png";
import highway from "@/assets/images/highway.png";
import search from "@/assets/images/search__glass_search_magnifying__Streamline_Core.png";
import menu from "@/assets/images/setting_menu_1__button_parallel_horizontal_lines_menu_navigation_three_hamburger__Streamline_Core.png";
import Image from "next/image";

interface HeaderProps {
  onBack?: () => void;
  title?: string;
  routeId?: number;
  openModal?: Function;
}

const Header = ({
  onBack,
  title = "경부고속도로",
  routeId,
  openModal,
}: HeaderProps) => {
  return (
    <header className="fixed z-10 top-0 left-0 right-0 h-10 bg-white border-b border-gray-200 flex items-center justify-between px-4 ">
      <div className="flex items-center gap-4">
        {onBack && (
          <button onClick={onBack} className="p-2">
            <Image src={arrowLeft.src} alt="뒤로가기" width={16} height={16} />
          </button>
        )}
        <div className="relative w-4 h-4">
          <Image src={highway.src} alt="고속도로" width={16} height={16} />
          <div className="absolute flex justify-center items-center top-[1.8px] left-0 w-4 h-4 font-medium text-[8px] text-[#FFF]">
            {routeId || ""}
          </div>
        </div>
        <h1 className="text-sm text-[#595959] font-bold">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            if (!!openModal) openModal();
          }}
        >
          <Image width={16} height={16} src={search.src} alt="검색" />
        </button>
      </div>
    </header>
  );
};

export default Header;
