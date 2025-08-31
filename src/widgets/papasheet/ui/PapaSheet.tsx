import { useState } from "react";

export default function PapaSheet() {
  // 간단한 셀 데이터 상태
  const [cells, setCells] = useState<{ [key: string]: string }>({});

  // 값 변경 핸들러
  const handleChange = (addr: string, value: string) => {
    setCells((prev) => ({ ...prev, [addr]: value }));
  };

  // 간단한 10×10 그리드 렌더 (나중에 200×200 확장)
  const rows = 10;
  const cols = 10;

  return (
    <div className="mt-53 overflow-auto max-w-full max-h-[70vh]">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="border bg-gray-100 w-12 h-8"></th>
            {Array.from({ length: cols }, (_, c) => (
              <th key={c} className="border bg-gray-100 w-24 text-center">
                {String.fromCharCode(65 + c)} {/* A,B,C... */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, r) => (
            <tr key={r}>
              <th className="border bg-gray-100 text-center w-12">{r + 1}</th>
              {Array.from({ length: cols }, (_, c) => {
                const addr = `${String.fromCharCode(65 + c)}${r + 1}`;
                return (
                  <td key={addr} className="border w-24 h-8">
                    <input
                      className="w-full h-full px-1 focus:outline-none"
                      value={cells[addr] || ""}
                      onChange={(e) => handleChange(addr, e.target.value)}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
