import { useRef, useState, useCallback } from "react";
import { CELL_HEIGHT, CELL_WIDTH } from "../config/constants";
import { GridHeader } from "./GridHeader";
import { GridIndex } from "./GridIndex";
import { Grid } from "./Grid";

export const Sheet = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [, setScroll] = useState({ left: 0, top: 0 });

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const next = { left: el.scrollLeft, top: el.scrollTop };
    setScroll(next);
  }, []);

  return (
    /** 2*2 grid
     * 레이아웃:
     * ┌───────────────┬────────────────────────────┐
     * │  corner(cell) │       GridHeader (X sync)  │
     * ├───────────────┼────────────────────────────┤
     * │   GridIndex   │       Grid (scroll)        │
     * └───────────────┴────────────────────────────┘
     */

    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="overflow-auto h-[calc(100dvh-64px-36px)]" // GridHeader 가 상하 스크롤 시 따라오게 설정
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `${CELL_WIDTH}px 1fr`,
          gridTemplateRows: `${CELL_HEIGHT}px 1fr`,
        }}
      >
        {/* 좌상단 corner(cell) */}
        <div
          className="border-b border-r border-gray-400 bg-gray-50 flex items-center justify-center text-sm text-gray-600 select-none sticky top-0 left-0 z-20"
          style={{ width: CELL_WIDTH, height: CELL_HEIGHT }}
        >
          {/* 전체선택 버튼 자리 */}
          ◻︎
        </div>

        {/* 헤더(가로 동기화) */}
        <div className="border-b border-gray-400 sticky top-0 z-10 bg-white">
          <GridHeader />
        </div>

        {/* 인덱스(세로 동기화) */}
        <div className="border-r border-gray-400 sticky left-0 bg-white">
          <GridIndex />
        </div>

        <Grid />
      </div>
    </div>
  );
};
