import { AddSheetButton, AllSheetsButton } from "@/shared/ui/Button";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t border-[rgb(225,227,225)] bg-[#F8FDFD] px-4 py-2 flex items-center text-gray-600">
      {/* 좌측 버튼 영역 */}
      <div className="flex items-center gap-2 ml-5 ">
        <AddSheetButton
          onClick={() => {
            /* 시트 생성 로직 */
          }}
        />
        <AllSheetsButton
          onClick={() => {
            /* 모든 시트 패널 열기 */
          }}
        />
      </div>

      {/* 우측 시트 목록 영역 */}
      <div className="flex items-center gap-2 ml-10 ">
        <div className="px-3 py-1 rounded-md border border-[rgb(225,227,225)] bg-white cursor-pointer hover:bg-gray-50">
          시트 1
        </div>
        <div className="px-3 py-1 rounded-md border border-[rgb(225,227,225)] bg-white cursor-pointer hover:bg-gray-50">
          시트 2
        </div>
        <div className="px-3 py-1 rounded-md border border-[rgb(225,227,225)] bg-white cursor-pointer hover:bg-gray-50">
          시트 3
        </div>
      </div>
    </footer>
  );
}
