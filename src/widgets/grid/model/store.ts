import { create } from "zustand";

export type Pos = { row: number; col: number };
export type Range = { start: Pos; end: Pos };

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
  // 단일 활성 셀
  active: Pos | null;
  activeCells: Pos[];
  activeCellMap: Record<string, true>;

  // 드래그중인 영역
  selection: Range | null;
  isDragging: boolean;
  setActive: (pos: Pos) => void;

  // 마우스 드래그 루틴
  beginSelection: (pos: Pos) => void; // mousedown
  updateSelection: (pos: Pos) => void; // mouseenter/mousemove
  endSelection: () => Pos[]; //mouseup
};

export const useGridStore = create<GridState>((set, get) => ({
  active: null,
  activeCells: [],
  activeCellMap: {},
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
      isDragging: false,
    });
  },

  beginSelection: (pos: Pos) => {
    console.log("▶ beginSelection", pos);

    //앵커 지정 + 드래그 시작
    set({
      active: pos,
      selection: { start: pos, end: pos },
      activeCells: [],
      activeCellMap: {},
      isDragging: true,
    });
  },

  updateSelection: (pos) => {
    if (!get().isDragging) return;
    const sel = get().selection;
    if (!sel) return;
    // 동일 위치면 스킵해도 무방
    if (sel.end.row === pos.row && sel.end.col === pos.col) return;
    set({ selection: { start: sel.start, end: pos } });
  },

  endSelection: () => {
    const sel = get().selection;
    // 드래그 했으면 범위 → 배열로 확정
    if (sel) {
      const { cells, map } = cellsFromRange(sel);
      set({
        selection: null,
        activeCells: cells,
        activeCellMap: map,
        isDragging: false,
      });

      return cells;
    }

    // 드래그가 아니었으면 현재 상태를 반환(단일 클릭 등)
    const current = get().activeCells;
    set({ isDragging: false });
    return current; // ✅ 비어있을 수도 있음
  },
}));
// 개별 훅으로 쪼개서 리렌더 최소화
export const useActive = () => useGridStore((s) => s.active);
export const useSelection = () => useGridStore((s) => s.selection);
export const useActiveCells = () => useGridStore((s) => s.activeCells);
export const useActiveCellMap = () => useGridStore((s) => s.activeCellMap);
export const useDragging = () => useGridStore((s) => s.isDragging);

// 액션 훅
export const useSetActive = () => useGridStore((s) => s.setActive);
export const useBeginSelection = () => useGridStore((s) => s.beginSelection);
export const useUpdateSelection = () => useGridStore((s) => s.updateSelection);
export const useEndSelection = () => useGridStore((s) => s.endSelection);
