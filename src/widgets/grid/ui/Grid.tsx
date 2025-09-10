// widgets/grid/ui/Grid.tsx
import type React from "react";
import { useGridStore } from "../model/store";
import { useMemo, useCallback, useEffect } from "react";
import { Cell } from "./Cell";
import {
  useActiveCellMap,
  useActiveBounds,
  useSetActive,
  useSelection,
  useBeginSelection,
  useUpdateSelection,
  useEndSelection,
  isRange,
} from "../model/store";

import {
  DEFAULT_COL_COUNT,
  DEFAULT_ROW_COUNT,
  CELL_WIDTH,
  CELL_HEIGHT,
} from "../config/constants";

const norm = (
  a: { row: number; col: number },
  b: { row: number; col: number }
) => ({
  r1: Math.min(a.row, b.row),
  r2: Math.max(a.row, b.row),
  c1: Math.min(a.col, b.col),
  c2: Math.max(a.col, b.col),
});

export const Grid = () => {
  const activeCellMap = useActiveCellMap();
  const activeBounds = useActiveBounds();
  const selection = useSelection();

  const setActive = useSetActive();
  const beginSelection = useBeginSelection();
  const updateSelection = useUpdateSelection();
  const endSelection = useEndSelection();

  // 스토어의 setValue 가져오기
  const setValue = useGridStore((s) => s.setValue);

  //  Backspace/Delete로 선택 영역 비우기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // 편집용 input/textarea/contentEditable에 포커스 있으면 무시
      const ae = document.activeElement as HTMLElement | null;
      if (
        ae &&
        (ae.tagName === "INPUT" ||
          ae.tagName === "TEXTAREA" ||
          ae.isContentEditable)
      ) {
        return;
      }

      if (e.key !== "Backspace" && e.key !== "Delete") return;

      // active가 1개도 없으면 무시
      const hasActive = Object.keys(activeCellMap).length > 0 || !!activeBounds;
      if (!hasActive) return;

      e.preventDefault(); // 브라우저 뒤로가기  방지

      if (activeBounds) {
        //  확정된 직사각형 범위가 있으면 그 범위를 싹 비우기
        const { r1, r2, c1, c2 } = activeBounds;
        for (let r = r1; r <= r2; r++) {
          for (let c = c1; c <= c2; c++) {
            setValue(r, c, "");
          }
        }
      } else {
        //  activeCellMap 기반으로 싹 비우기
        for (const key of Object.keys(activeCellMap)) {
          const [rStr, cStr] = key.split(",");
          const r = Number(rStr);
          const c = Number(cStr);
          setValue(r, c, "");
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCellMap, activeBounds, setValue]);

  const rows = useMemo(
    () => Array.from({ length: DEFAULT_ROW_COUNT }, (_, r) => r),
    []
  );
  const cols = useMemo(
    () => Array.from({ length: DEFAULT_COL_COUNT }, (_, c) => c),
    []
  );

  // 단일 클릭
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      setActive({ row, col });
    },
    [setActive]
  );

  // 드래그 시작 (mousedown)
  const handleCellMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, row: number, col: number) => {
      if (e.button !== 0) return; // 좌 클릭만
      e.preventDefault(); // 텍스트 드래그 방지
      beginSelection({ row, col });
    },
    [beginSelection]
  );

  // 드래그 중 (mouseenter) - 셀 경계 넘어갈 때마다 업데이트
  const handleCellMouseEnter = useCallback(
    (row: number, col: number) => {
      updateSelection({ row, col });
    },
    [updateSelection]
  );

  // 그리드 밖에서 mouseup 되는 경우도 마감되도록 window 리스너
  useEffect(() => {
    const onUp = () => {
      const cells = endSelection();
      console.log("active cells:", cells);
    };
    window.addEventListener("mouseup", onUp);
    return () => window.removeEventListener("mouseup", onUp);
  }, [endSelection]);

  return (
    <div
      className="relative grid border border-gray-300 bg-white select-none"
      style={{
        gridTemplateColumns: `repeat(${DEFAULT_COL_COUNT}, ${CELL_WIDTH}px)`,
        width: DEFAULT_COL_COUNT * CELL_WIDTH,
        userSelect: "none",
      }}
    >
      {/* 셀들 */}
      {rows.flatMap((row) =>
        cols.map((col) => {
          const selected =
            !!activeCellMap[`${row},${col}`] ||
            isRange({ row, col }, selection);

          //  edge는 확정 후에만(드래그 중엔 숨김)
          const edgeBounds = selection ? null : activeBounds;

          //  edge는 확정된 활성 셀에만 계산
          let edge:
            | {
                top?: boolean;
                right?: boolean;
                bottom?: boolean;
                left?: boolean;
              }
            | undefined;

          if (edgeBounds && activeCellMap[`${row},${col}`]) {
            const { r1, r2, c1, c2 } = edgeBounds;
            edge = {
              top: row === r1,
              bottom: row === r2,
              left: col === c1,
              right: col === c2,
            };
          }
          return (
            <Cell
              key={`${row}-${col}`}
              row={row}
              col={col}
              value={""}
              isActive={selected}
              edge={edge}
              onMouseDown={handleCellMouseDown}
              onMouseEnter={handleCellMouseEnter}
              onClick={handleCellClick}
            />
          );
        })
      )}

      {/* 드래그 영역 오버레이 */}
      {selection &&
        (() => {
          const { r1, r2, c1, c2 } = norm(selection.start, selection.end);
          const top = r1 * CELL_HEIGHT;
          const left = c1 * CELL_WIDTH;
          const width = (c2 - c1 + 1) * CELL_WIDTH;
          const height = (r2 - r1 + 1) * CELL_HEIGHT;

          return (
            <div
              className="pointer-events-none absolute"
              style={{
                top,
                left,
                width,
                height,
                outline: "2px dashed rgba(37,99,235,0.9)", // 파란 점선
                outlineOffset: "-2px",
                boxShadow: "inset 0 0 0 1px rgba(37,99,235,0.5)", // 안쪽 얇은 보더
              }}
            />
          );
        })()}
    </div>
  );
};
