/**
 * Header.tsx
 *
 * 애플리케이션의 헤더 컴포넌트입니다.
 * 뒤로가기 버튼, 고속도로 아이콘, 제목, 검색 버튼 등을 포함합니다.
 */

import arrowLeft from "@/assets/images/arrows_button_left__arrow.png";
import highway from "@/assets/images/highway.png";
import search from "@/assets/images/search__glass_search_magnifying__Streamline_Core.png";
import menu from "@/assets/images/setting_menu_1__button_parallel_horizontal_lines_menu_navigation_three_hamburger__Streamline_Core.png";
import Image from "next/image";

/**
 * 헤더 컴포넌트의 Props 인터페이스
 *
 * @interface HeaderProps
 * @property {() => void} [onBack] - 뒤로가기 버튼 클릭 핸들러
 * @property {string} [title] - 헤더 제목
 * @property {string} [routeId] - 고속도로 ID
 * @property {Function} [openModal] - 모달 열기 함수
 */
interface HeaderProps {
  onBack?: () => void;
  title?: string;
  routeId?: string;
  openModal?: Function;
}

/**
 * 헤더 컴포넌트
 *
 * 애플리케이션 상단에 표시되는 헤더 컴포넌트입니다.
 * 뒤로가기 버튼, 고속도로 아이콘, 제목, 검색 버튼을 포함합니다.
 *
 * @param {HeaderProps} props - 헤더 컴포넌트 props
 * @returns {JSX.Element} 헤더 컴포넌트 JSX 요소
 */
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
          <div className="absolute flex justify-center items-center top-[1.8px] left-0 w-4 h-4">
            <span
              className="font-medium text-[8px] text-[#FFF]"
              style={{ letterSpacing: -1 }}
            >
              {routeId || ""}
            </span>
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
