import { calendarEvents, calendarSummary } from '../data/schedule';

// MVP: mock 반환. 고도화 시 Google Calendar API 직접 호출로 교체
export async function fetchGoogleCalendarEvents(date) {
  return calendarEvents.elevated;
}

export async function fetchCalendarSummary(date) {
  return calendarSummary.elevated;
}

// 추천 수락 후 Google Calendar에 일정 생성
// MVP: Toast 알림만. 고도화 시 Google Calendar API 호출
export async function createGoogleCalendarEvent(event) {
  // TODO: POST https://www.googleapis.com/calendar/v3/calendars/primary/events
  console.log('[calendar] createGoogleCalendarEvent (mock):', event);
  return { id: `mock_${Date.now()}`, ...event, status: 'created' };
}

// 추천 상태 업데이트 (수락/미루기/제외)
export async function updateRecommendationStatus(id, status) {
  // TODO: 백엔드 API 연동 후 Supabase 업데이트로 교체
  console.log('[calendar] updateRecommendationStatus (mock):', id, status);
  return { id, status };
}
