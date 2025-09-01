import { useRef, useState, useCallback } from "react";
import { CELL_HEIGHT, CELL_WIDTH } from "../config/constants";
import { GridHeader } from "./GridHeader";
import { GridIndex } from "./GridIndex";
import { Grid } from "./Grid";

export const Sheet = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const headerInnerRef = useRef<HTMLDivElement | null>(null);
  const indexInnerRef = useRef<HTMLDivElement | null>(null);

  const [, setScroll] = useState({ left: 0, top: 0 });

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const next = { left: el.scrollLeft, top: el.scrollTop };
    setScroll(next);

    // 헤더/인덱스는 transform으로 따라가게 처리 (스크롤바 안 보이게)
    if (headerInnerRef.current) {
      headerInnerRef.current.style.transform = `translateX(${-next.left}px)`;
    }
    if (indexInnerRef.current) {
      indexInnerRef.current.style.transform = `translateY(${-next.top}px)`;
    }
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
      className="grid"
      style={{
        gridTemplateColumns: `${CELL_WIDTH}px 1fr`,
        gridTemplateRows: `${CELL_HEIGHT}px 1fr`,
      }}
    >
      {/* 좌상단 corner(cell) */}
      <div
        className="border-b border-r border-gray-400 bg-gray-50 flex items-center justify-center text-sm text-gray-600 select-none"
        style={{ width: CELL_WIDTH, height: CELL_HEIGHT }}
      >
        {/* 전체선택 버튼 자리 */}
        ◻︎
      </div>

      {/* 헤더(가로 동기화) */}
      <div className="relative overflow-hidden border-b border-gray-400">
        <div ref={headerInnerRef}>
          <GridHeader />
        </div>
      </div>

      {/* 인덱스(세로 동기화) */}
      <div className="relative overflow-hidden border-r border-gray-400">
        <div ref={indexInnerRef}>
          <GridIndex />
        </div>
      </div>

      {/* 메인 스크롤 영역 */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="overflow-auto "
        style={{
          background: "white",
        }}
      >
        <Grid />
      </div>
    </div>
  );
};
