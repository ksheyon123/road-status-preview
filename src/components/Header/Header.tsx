import BackArrow from "@/assets/images/arrows_button_left__arrow.png";
import Highway from "@/assets/images/highway.png";
import Search from "@/assets/images/search__glass_search_magnifying__Streamline_Core.png";
import Menu from "@/assets/images/setting_menu_1__button_parallel_horizontal_lines_menu_navigation_three_hamburger__Streamline_Core.png";

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
            <img src={BackArrow.src} alt="뒤로가기" className="w-6 h-6" />
          </button>
        )}
        <div className="relative w-8 h-8">
          <img className="w-full h-full" src={Highway.src} alt="고속도로" />
          <div className="absolute flex justify-center items-center top-[1.8px] left-0 w-8 h-8 font-medium text-[#FFF]">
            {routeId}
          </div>
        </div>
      </div>

      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl text-[#595959] font-bold">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        <button className="p-2">
          <img src={Search.src} alt="검색" className="w-6 h-6" />
        </button>
        <button className="p-2">
          <img src={Menu.src} alt="메뉴" className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
