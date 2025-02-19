import arrowLeft from "@/assets/images/arrows_button_left__arrow.png";
import highway from "@/assets/images/highway.png";
import search from "@/assets/images/search__glass_search_magnifying__Streamline_Core.png";
import menu from "@/assets/images/setting_menu_1__button_parallel_horizontal_lines_menu_navigation_three_hamburger__Streamline_Core.png";

interface HeaderProps {
  onBack?: () => void;
  title?: string;
  routeId?: number;
}

const Header = ({ onBack, title = "경부고속도로", routeId }: HeaderProps) => {
  return (
    <header className="fixed z-10 top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 ">
      <div className="flex items-center gap-4">
        {onBack && (
          <button onClick={onBack} className="p-2">
            <img src={arrowLeft.src} alt="뒤로가기" width={24} height={24} />
          </button>
        )}
        <div className="relative w-8 h-8">
          <img src={highway.src} alt="고속도로" width={32} height={32} />
          <div className="absolute flex justify-center items-center top-[1.8px] left-0 w-8 h-8 font-medium text-[#FFF]">
            {routeId || ""}
          </div>
        </div>
      </div>

      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl text-[#595959] font-bold">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        <button className="p-2">
          <img src={search.src} alt="검색" width={24} height={24} />
        </button>
        <button className="p-2">
          <img src={menu.src} alt="메뉴" width={24} height={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
