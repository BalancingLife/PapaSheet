import { create } from "zustand";

export type Pos = { row: number; col: number };
export type Range = { start: Pos; end: Pos };
export type Bounds = { r1: number; r2: number; c1: number; c2: number };

function normalize(a: Pos, b: Pos) {
  const r1 = Math.min(a.row, b.row);
  const r2 = Math.max(a.row, b.row);
  const c1 = Math.min(a.col, b.col);
  const c2 = Math.max(a.col, b.col);
  return { r1, r2, c1, c2 };
}

export function isRange(p: Pos, range: Range | null) {
  if (!range) return false;
  const { r1, r2, c1, c2 } = normalize(range.start, range.end);
  return p.row >= r1 && p.row <= r2 && p.col >= c1 && p.col <= c2;
}

// 빠른 키
const keyOf = (r: number, c: number) => `${r},${c}`;

// range → 셀 배열/맵 생성
function cellsFromRange(range: Range) {
  const { r1, r2, c1, c2 } = normalize(range.start, range.end);
  const cells: Pos[] = [];
  const map: Record<string, true> = {};
  for (let r = r1; r <= r2; r++) {
    for (let c = c1; c <= c2; c++) {
      cells.push({ row: r, col: c });
      map[keyOf(r, c)] = true;
    }
  }
  return { cells, map };
}

type GridState = {
  // 단일 활성 셀(포커스 개념으로 유지하고 싶으면 사용)
  active: Pos | null;

  // 확정된 활성 셀들
  activeCells: Pos[];
  activeCellMap: Record<string, true>;
  activeBounds: Bounds | null;

  // 드래그중 임시 영역
  selection: Range | null;
  isDragging: boolean;

  // 액션
  setActive: (pos: Pos) => void;
  beginSelection: (pos: Pos) => void; // mousedown
  updateSelection: (pos: Pos) => void; // mouseenter/mousemove
  endSelection: () => Pos[]; // mouseup → 활성 셀 배열 반환
};

export const useGridStore = create<GridState>((set, get) => ({
  active: null,
  activeCells: [],
  activeCellMap: {},
  activeBounds: null,
  selection: null,
  isDragging: false,

  setActive: (pos) => {
    const cur = get().active;
    if (cur && cur.row === pos.row && cur.col === pos.col) return; // 동일값 set 방지
    set({
      active: pos,
      selection: null,
      activeCells: [pos],
      activeCellMap: { [keyOf(pos.row, pos.col)]: true },
      activeBounds: { r1: pos.row, r2: pos.row, c1: pos.col, c2: pos.col },
      isDragging: false,
    });
  },

  beginSelection: (pos: Pos) => {
    // 앵커 지정 + 드래그 시작
    set({
      active: pos,
      selection: { start: pos, end: pos },
      activeCells: [],
      activeCellMap: {},
      activeBounds: null,
      isDragging: true,
    });
  },

  updateSelection: (pos) => {
    if (!get().isDragging) return;
    const sel = get().selection;
    if (!sel) return;
    if (sel.end.row === pos.row && sel.end.col === pos.col) return; // 동일 좌표면 스킵
    set({ selection: { start: sel.start, end: pos } });
  },

  endSelection: () => {
    const sel = get().selection;

    if (sel) {
      const { r1, r2, c1, c2 } = normalize(sel.start, sel.end);
      const { cells, map } = cellsFromRange(sel);

      set({
        selection: null,
        activeCells: cells,
        activeCellMap: map,
        activeBounds: { r1, r2, c1, c2 },
        isDragging: false,
      });

      return cells;
    }

    // 드래그가 아니면 현재 상태 반환(단일 클릭 등)
    const current = get().activeCells;
    set({ isDragging: false });
    return current;
  },
}));

// 개별 훅으로 쪼개서 리렌더 최소화
export const useActive = () => useGridStore((s) => s.active);
export const useSelection = () => useGridStore((s) => s.selection);
export const useActiveCells = () => useGridStore((s) => s.activeCells);
export const useActiveCellMap = () => useGridStore((s) => s.activeCellMap);
export const useActiveBounds = () => useGridStore((s) => s.activeBounds);
export const useDragging = () => useGridStore((s) => s.isDragging);

// 액션 훅
export const useSetActive = () => useGridStore((s) => s.setActive);
export const useBeginSelection = () => useGridStore((s) => s.beginSelection);
export const useUpdateSelection = () => useGridStore((s) => s.updateSelection);
export const useEndSelection = () => useGridStore((s) => s.endSelection);
