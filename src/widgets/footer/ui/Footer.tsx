import { Button } from "@/shared/ui/Button";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t border-[rgb(225,227,225)] bg-[#F8FDFD] px-4 py-2 flex items-center text-gray-600">
      <Button />
      {/* 좌측 버튼 영역 */}
      <div className="flex items-center gap-2 ml-5 ">
        <button className="px-3 py-1 rounded-md bg-white border border-[rgb(225,227,225)] hover:bg-gray-50 transition">
          +
        </button>
        <button className="px-3 py-1 rounded-md bg-white border border-[rgb(225,227,225)] hover:bg-gray-50 transition">
          -
        </button>
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
