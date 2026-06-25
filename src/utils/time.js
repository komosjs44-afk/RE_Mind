export function parseTime(time) {
  const match = String(time || '').match(/(\d+):(\d+)/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : 9999;
}

export function addMinutes(time, minutes) {
  const [hour, minute] = time.split(':').map(Number);
  const total = hour * 60 + minute + minutes;
  const nextHour = String(Math.floor(total / 60)).padStart(2, '0');
  const nextMinute = String(total % 60).padStart(2, '0');
  return `${nextHour}:${nextMinute}`;
}

export function parseDurationMinutes(text = '') {
  const hourMatch = text.match(/(\d+)\s*(시간|hour|hr|h)/i);
  const minuteMatch = text.match(/(\d+)\s*(분|minute|min|m)/i);
  const hours = hourMatch ? Number(hourMatch[1]) : 0;
  const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;
  const total = hours * 60 + minutes;
  return total > 0 ? total : 30;
}
