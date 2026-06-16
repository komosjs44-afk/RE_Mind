const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const dows = ['일', '월', '화', '수', '목', '금', '토'];
const juneEventDensity = {
  2: 3,
  3: 4,
  5: 4,
  6: 3,
  8: 4,
  10: 3,
  12: 4,
  13: 3,
  15: 4,
  16: 12,
  17: 4,
  18: 5,
  19: 3,
  20: 4,
  22: 4,
  23: 5,
  24: 3,
  25: 4,
  27: 3,
  29: 4,
  30: 3,
};
const juneRiskDays = [12, 15, 16, 18, 23, 25, 29];

export default function MiniMonthPicker({ curY, curM, selD, setCurY, setCurM, setSelD }) {
  const first = new Date(curY, curM, 1).getDay();
  const days = new Date(curY, curM + 1, 0).getDate();
  const prevDays = new Date(curY, curM, 0).getDate();
  const cells = [];

  for (let i = 0; i < first; i += 1) cells.push({ d: prevDays - first + i + 1, other: true });
  for (let d = 1; d <= days; d += 1) cells.push({ d, other: false });
  while (cells.length % 7 !== 0) cells.push({ d: cells.length, other: true });

  const changeMonth = (diff) => {
    let nextM = curM + diff;
    let nextY = curY;
    if (nextM > 11) {
      nextM = 0;
      nextY += 1;
    }
    if (nextM < 0) {
      nextM = 11;
      nextY -= 1;
    }
    setCurM(nextM);
    setCurY(nextY);
    setSelD(16);
  };

  return (
    <section className="mx-4 mt-4 rounded-[24px] border border-border bg-card p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between px-1">
        <button onClick={() => changeMonth(-1)} aria-label="이전 달" className="grid h-8 w-8 place-items-center rounded-full text-text-secondary transition-all active:scale-[0.98]">
          <i className="ti ti-chevron-left" />
        </button>
        <strong className="text-[14px] font-semibold text-text-primary">
          {curY}년 {months[curM]}
        </strong>
        <button onClick={() => changeMonth(1)} aria-label="다음 달" className="grid h-8 w-8 place-items-center rounded-full text-text-secondary transition-all active:scale-[0.98]">
          <i className="ti ti-chevron-right" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {dows.map((dow) => (
          <div key={dow} className="text-center text-[10px] font-medium text-text-secondary/70">
            {dow}
          </div>
        ))}
        {cells.map((cell, idx) => {
          const isToday = curY === 2026 && curM === 5 && cell.d === 16 && !cell.other;
          const isSel = selD === cell.d && !cell.other;
          const eventCount = curY === 2026 && curM === 5 && !cell.other ? juneEventDensity[cell.d] || 0 : 0;
          const isRiskDay = juneRiskDays.includes(cell.d) && curY === 2026 && curM === 5 && !cell.other;
          const markerCount = Math.min(eventCount, 3);

          return (
            <button
              key={`${cell.d}-${idx}`}
              onClick={() => !cell.other && setSelD(cell.d)}
              className={`relative h-8 rounded-[14px] text-[11px] font-medium transition-all active:scale-[0.96] ${cell.other ? 'text-text-secondary/30' : 'text-text-primary'} ${
                isSel ? 'bg-navy text-white' : isToday ? 'bg-ai-soft text-ai' : ''
              }`}
            >
              {cell.d}
              {markerCount > 0 && (
                <span className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                  {Array.from({ length: markerCount }).map((_, markerIndex) => (
                    <span
                      key={markerIndex}
                      className={`h-1 w-1 rounded-full ${isSel ? 'bg-white' : isRiskDay ? 'bg-risk' : 'bg-ai'}`}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
