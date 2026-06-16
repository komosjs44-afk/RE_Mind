import RiskHeatOverlay from './RiskHeatOverlay';
import CalendarEventBlock from './CalendarEventBlock';
import AIInsertedBlock from './AIInsertedBlock';
import { parseTime, parseDurationMinutes } from '../../utils/time';

const START_HOUR = 7;
const END_HOUR = 19;
const HOUR_HEIGHT = 120;
const SLOT_MINUTES = 15;
const SLOT_HEIGHT = HOUR_HEIGHT / (60 / SLOT_MINUTES);
const TOTAL_COLUMNS = 12;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function minutesFromStart(time) {
  return parseTime(time) - START_HOUR * 60;
}

function resolveDurationMinutes(event) {
  if (event.endTime) return Math.max(parseTime(event.endTime) - parseTime(event.time), SLOT_MINUTES);
  return Math.max(parseDurationMinutes(event.sub || event.title), SLOT_MINUTES);
}

function toGridRow(minutes) {
  return Math.floor(minutes / SLOT_MINUTES) + 1;
}

function normalizeEvents(events) {
  const timelineStart = START_HOUR * 60;
  const timelineEnd = END_HOUR * 60;

  return events
    .map((event, index) => {
      const rawStart = parseTime(event.time);
      const duration = resolveDurationMinutes(event);
      const rawEnd = event.endTime ? parseTime(event.endTime) : rawStart + duration;
      const start = clamp(rawStart, timelineStart, timelineEnd - SLOT_MINUTES);
      const end = clamp(Math.max(rawEnd, start + SLOT_MINUTES), start + SLOT_MINUTES, timelineEnd);

      return {
        event,
        index,
        start,
        end,
        startOffset: start - timelineStart,
        endOffset: end - timelineStart,
        duration: end - start,
      };
    })
    .sort((a, b) => a.start - b.start || a.end - b.end || a.index - b.index);
}

function assignCollisionColumns(items) {
  const groups = [];
  let current = [];
  let currentEnd = -1;

  items.forEach((item) => {
    if (current.length === 0 || item.start < currentEnd) {
      current.push(item);
      currentEnd = Math.max(currentEnd, item.end);
      return;
    }

    groups.push(current);
    current = [item];
    currentEnd = item.end;
  });

  if (current.length) groups.push(current);

  return groups.flatMap((group) => {
    const columns = [];
    const assigned = group.map((item) => {
      const columnIndex = columns.findIndex((end) => end <= item.start);
      const column = columnIndex === -1 ? columns.length : columnIndex;
      columns[column] = item.end;
      return { ...item, column };
    });

    const columnCount = Math.max(columns.length, 1);
    return assigned.map((item) => ({ ...item, columnCount }));
  });
}

function getGridColumn({ column, columnCount }) {
  if (columnCount <= 1) return '1 / -1';

  const span = Math.max(Math.floor(TOTAL_COLUMNS / columnCount), 1);
  const start = column * span + 1;
  const end = column === columnCount - 1 ? TOTAL_COLUMNS + 1 : start + span;
  return `${start} / ${end}`;
}

export default function DayTimeline({ events, riskWindow }) {
  const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);
  const slotCount = ((END_HOUR - START_HOUR) * 60) / SLOT_MINUTES;
  const laidOutEvents = assignCollisionColumns(normalizeEvents(events));

  const riskGridRow = riskWindow
    ? `${toGridRow(clamp(minutesFromStart(riskWindow.start), 0, slotCount * SLOT_MINUTES))} / ${toGridRow(clamp(minutesFromStart(riskWindow.end), SLOT_MINUTES, slotCount * SLOT_MINUTES))}`
    : null;

  return (
    <div className="flex w-full gap-2">
      <div
        className="grid w-10 flex-none"
        style={{ gridTemplateRows: `repeat(${slotCount}, minmax(${SLOT_HEIGHT}px, auto))` }}
      >
        {hours.slice(0, -1).map((hour) => (
          <span
            key={hour}
            className="pt-1 text-[11px] font-medium leading-none text-text-secondary"
            style={{ gridRow: `${toGridRow((hour - START_HOUR) * 60)} / span 4` }}
          >
            {String(hour).padStart(2, '0')}:00
          </span>
        ))}
      </div>

      <div
        className="grid min-w-0 flex-1 grid-cols-12 gap-x-1.5 rounded-lg border-l border-border pl-3"
        style={{ gridTemplateRows: `repeat(${slotCount}, minmax(${SLOT_HEIGHT}px, auto))` }}
      >
        {Array.from({ length: slotCount }).map((_, index) => {
          const isHourLine = index % (60 / SLOT_MINUTES) === 0;
          return (
            <div
              key={`grid-${index}`}
              className={`${isHourLine ? 'border-t border-border/70' : 'border-t border-border/25'} z-0`}
              style={{ gridRow: `${index + 1} / span 1`, gridColumn: '1 / -1' }}
            />
          );
        })}

        {riskGridRow && <RiskHeatOverlay gridRow={riskGridRow} />}

        {laidOutEvents.map((item) => {
          const gridRow = `${toGridRow(item.startOffset)} / ${toGridRow(item.endOffset)}`;
          const style = {
            gridRow,
            gridColumn: getGridColumn(item),
            minHeight: `${(item.duration / 60) * HOUR_HEIGHT}px`,
          };
          const key = `${item.event.id || item.event.title}-${item.event.time}`;

          return item.event.type === 'ai' ? (
            <AIInsertedBlock key={key} event={item.event} style={style} />
          ) : (
            <CalendarEventBlock key={key} event={item.event} style={style} />
          );
        })}
      </div>
    </div>
  );
}
