const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const dows = ['일', '월', '화', '수', '목', '금', '토'];

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
    <section className="mx-4 mt-4 rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between px-1">
        <button onClick={() => changeMonth(-1)} aria-label="이전 달" className="grid h-7 w-7 place-items-center rounded-lg text-text-secondary">
          <i className="ti ti-chevron-left" />
        </button>
        <strong className="text-[13px] font-semibold text-text-primary">
          {curY}년 {months[curM]}
        </strong>
        <button onClick={() => changeMonth(1)} aria-label="다음 달" className="grid h-7 w-7 place-items-center rounded-lg text-text-secondary">
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
          const isRiskDay = [16, 18].includes(cell.d) && curY === 2026 && curM === 5 && !cell.other;

          return (
            <button
              key={`${cell.d}-${idx}`}
              onClick={() => !cell.other && setSelD(cell.d)}
              className={`relative h-9 rounded-md text-[11px] font-medium ${cell.other ? 'text-text-secondary/30' : 'text-text-primary'} ${
                isSel ? 'bg-navy text-white' : isToday ? 'bg-ai-soft text-ai' : ''
              } ${isRiskDay && !isSel ? 'ring-1 ring-inset ring-warning/50' : ''}`}
            >
              {cell.d}
            </button>
          );
        })}
      </div>
    </section>
  );
}
