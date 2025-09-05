// widgets/grid/ui/Cell.tsx

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CellProps } from "../types";
import { CELL_WIDTH, CELL_HEIGHT } from "../config/constants";
import { useGridStore, selectCellValue } from "../model/store";

export const Cell = React.memo(function Cell({
  row,
  col,
  value: propValue,
  isActive = false,
  edge,
  onClick,
  onMouseDown,
  onMouseEnter,
}: CellProps) {
  // 나머지 셀들은 리렌더 안되는지 테스트 하는 코드
  // const renderCountRef = useRef(0);
  // renderCountRef.current += 1;

  // 1) 이 셀의 전역 값만 구독 (리렌더 최소화)
  const select = useMemo(() => selectCellValue(row, col), [row, col]);
  const storeValue = useGridStore(select);
  const setValue = useGridStore((s) => s.setValue);

  // 2) 화면에 보여줄 값: 전역값 우선, 없으면 propValue fallback
  const displayValue = storeValue ?? propValue ?? "";

  // 3) 편집 상태는 로컬로 관리 → 타이핑 중 전역 리렌더 X
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(displayValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = useCallback(() => {
    onClick(row, col);
  }, [onClick, row, col]);

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setDraft(displayValue);
      setEditing(true);
    },
    [displayValue]
  );

  useEffect(() => {
    if (editing) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [editing]);

  const commit = useCallback(() => {
    setValue(row, col, draft);
    setEditing(false);
  }, [row, col, draft, setValue]);

  const cancel = useCallback(() => {
    setEditing(false);
    setDraft(displayValue);
  }, [displayValue]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        commit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        cancel();
      }
    },
    [commit, cancel]
  );

  // 편집 중 드래그/셀렉션 충돌 방지
  const stop = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (onMouseDown) onMouseDown(e, row, col);
    },
    [onMouseDown, row, col]
  );

  const handleMouseEnter = useCallback(() => {
    if (onMouseEnter) onMouseEnter(row, col);
  }, [onMouseEnter, row, col]);

  // // 매 렌더마다 로그
  // useEffect(() => {
  //   // 예: [Cell 3,5] render#2 (active:true, value:"")
  //   console.log(
  //     `[Cell ${row},${col}] render#${renderCountRef.current} (active:${isActive}, value:"${value}")`
  //   );
  // });

  // 기본 클래스
  const classes = ["flex items-center justify-center text-sm select-none"];

  // 배경: isActive면 반드시 blue-200
  classes.push(isActive ? "bg-blue-200" : "bg-white hover:bg-gray-100");

  // 기본 보더는 항상 회색(내부 그리드선 유지)
  classes.push("border border-gray-200");

  // edge가 있는 면만 파란 보더로 오버라이드 (확정 후에만 내려옴)
  if (edge?.top) classes.push("border-t-2 border-t-blue-500");
  if (edge?.right) classes.push("border-r-2 border-r-blue-500");
  if (edge?.bottom) classes.push("border-b-2 border-b-blue-500");
  if (edge?.left) classes.push("border-l-2 border-l-blue-500");

  return (
    <div
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onDoubleClick={handleDoubleClick}
      className={classes.join(" ")}
      style={{ width: CELL_WIDTH, height: CELL_HEIGHT, position: "relative" }}
    >
      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={commit}
          onMouseDown={stop}
          className="absolute inset-0 w-full h-full outline-none px-2 text-sm"
          style={{
            // 셀 테두리와 자연스럽게 어우러지게
            border: "1px solid rgba(59,130,246,0.6)", // 파란 느낌
            boxShadow: "0 0 0 2px rgba(59,130,246,0.2)",
            borderRadius: 2,
            background: "white",
          }}
        />
      ) : (
        <span className="truncate px-2 w-full text-center select-none">
          {displayValue}
        </span>
      )}
      {/* edge 표시는 기존 로직/스타일을 그대로 유지 (예: 좌표 표시 등) */}
      {edge && !editing && (
        <div className="pointer-events-none absolute inset-0 ring-2 ring-blue-400" />
      )}
    </div>
  );
});
