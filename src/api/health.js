import { healthSummary } from '../data/schedule';

// MVP: mock 반환. 고도화 시 HealthKit → Supabase 경유 조회로 교체
export async function fetchHealthSummary(date = new Date().toISOString().slice(0, 10)) {
  return healthSummary.elevated;
}

// 수동 입력 건강 데이터 저장 (MVP: localStorage)
export async function saveHealthSummary(data) {
  const key = `remind_health_${data.date}`;
  window.localStorage.setItem(key, JSON.stringify(data));
  return data;
}

export async function loadHealthSummary(date) {
  const key = `remind_health_${date}`;
  const saved = window.localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fetchHealthSummary(date);
}
