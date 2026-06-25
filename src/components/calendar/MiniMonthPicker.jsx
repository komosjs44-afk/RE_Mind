import { View, Text, Pressable } from 'react-native';
import TablerIcon from '../ui/TablerIcon';

const months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
const dows = ['일','월','화','수','목','금','토'];
const juneEventDensity = { 2:3,3:4,5:4,6:3,8:4,10:3,12:4,13:3,15:4,16:12,17:4,18:5,19:3,20:4,22:4,23:5,24:3,25:4,27:3,29:4,30:3 };
const juneRiskDays = [12,15,16,18,23,25,29];

export default function MiniMonthPicker({ curY, curM, selD, setCurY, setCurM, setSelD }) {
  const first = new Date(curY, curM, 1).getDay();
  const days = new Date(curY, curM + 1, 0).getDate();
  const prevDays = new Date(curY, curM, 0).getDate();
  const cells = [];

  for (let i = 0; i < first; i++) cells.push({ d: prevDays - first + i + 1, other: true });
  for (let d = 1; d <= days; d++) cells.push({ d, other: false });
  while (cells.length % 7 !== 0) cells.push({ d: cells.length, other: true });

  const changeMonth = (diff) => {
    let nextM = curM + diff;
    let nextY = curY;
    if (nextM > 11) { nextM = 0; nextY += 1; }
    if (nextM < 0) { nextM = 11; nextY -= 1; }
    setCurM(nextM);
    setCurY(nextY);
    setSelD(16);
  };

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  return (
    <View className="mx-4 mt-4 rounded-[24px] border border-border bg-card p-3 shadow-sm">
      <View className="mb-2 flex-row items-center justify-between px-1">
        <Pressable
          className="h-8 w-8 items-center justify-center rounded-full"
          onPress={() => changeMonth(-1)}
        >
          <TablerIcon name="chevron-left" size={16} color="#7A7F87" />
        </Pressable>
        <Text className="text-[14px] font-bold text-text-primary">
          {curY}년 {months[curM]}
        </Text>
        <Pressable
          className="h-8 w-8 items-center justify-center rounded-full"
          onPress={() => changeMonth(1)}
        >
          <TablerIcon name="chevron-right" size={16} color="#7A7F87" />
        </Pressable>
      </View>

      <View className="flex-row">
        {dows.map((dow) => (
          <View key={dow} className="flex-1 items-center py-1">
            <Text className="text-[10px] font-medium text-text-secondary/70">{dow}</Text>
          </View>
        ))}
      </View>

      {rows.map((row, rowIdx) => (
        <View key={rowIdx} className="flex-row">
          {row.map((cell, cellIdx) => {
            const isToday = curY === 2026 && curM === 5 && cell.d === 16 && !cell.other;
            const isSel = selD === cell.d && !cell.other;
            const eventCount = curY === 2026 && curM === 5 && !cell.other ? juneEventDensity[cell.d] || 0 : 0;
            const isRiskDay = juneRiskDays.includes(cell.d) && curY === 2026 && curM === 5 && !cell.other;
            const markerCount = Math.min(eventCount, 3);

            return (
              <Pressable
                key={`${cell.d}-${cellIdx}`}
                className={`flex-1 items-center rounded-[14px] py-1 ${isSel ? 'bg-navy' : isToday ? 'bg-ai-soft' : ''}`}
                style={{ minHeight: 32 }}
                onPress={() => !cell.other && setSelD(cell.d)}
              >
                <Text className={`text-[11px] font-medium ${cell.other ? 'text-text-secondary/30' : isSel ? 'text-white' : isToday ? 'text-ai' : 'text-text-primary'}`}>
                  {cell.d}
                </Text>
                {markerCount > 0 && (
                  <View className="flex-row gap-0.5 mt-0.5">
                    {Array.from({ length: markerCount }).map((_, mi) => (
                      <View
                        key={mi}
                        className={`h-1 w-1 rounded-full ${isSel ? 'bg-white' : isRiskDay ? 'bg-risk' : 'bg-ai'}`}
                      />
                    ))}
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
