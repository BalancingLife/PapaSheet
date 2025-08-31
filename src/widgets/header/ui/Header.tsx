export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[rgb(4,171,70)] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 좌측 로고 */}
        <div className="text-lg font-bold tracking-wide">PapaSheet</div>

        {/* 중앙 제목 */}
        <div className="text-base font-medium hidden sm:block">
          매출 관리 스프레드시트
        </div>

        {/* 우측 메뉴 */}
        <div className="flex items-center gap-4 text-sm">
          <button className="hover:underline">도움말</button>
          <button className="bg-white text-[rgb(4,171,70)] font-semibold px-3 py-1 rounded-lg hover:bg-gray-100 transition">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};
