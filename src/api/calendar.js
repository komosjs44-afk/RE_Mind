import { calendarEvents, calendarSummary } from '../data/schedule';

export async function fetchGoogleCalendarEvents(date) {
  return calendarEvents.elevated;
}

export async function fetchCalendarSummary(date) {
  return calendarSummary.elevated;
}

// 추천 수락 후 Google Calendar에 새 일정 생성
// 고도화 시: POST https://www.googleapis.com/calendar/v3/calendars/primary/events
export async function createGoogleCalendarEvent(event) {
  console.log('[calendar] createGoogleCalendarEvent (mock):', event);
  return { id: `gcal_${Date.now()}`, ...event, status: 'created' };
}

// 시간 이동 후 기존 일정 업데이트
// 고도화 시: PATCH https://www.googleapis.com/calendar/v3/calendars/primary/events/{eventId}
export async function updateGoogleCalendarEvent(eventId, updates) {
  console.log('[calendar] updateGoogleCalendarEvent (mock):', eventId, updates);
  return { id: eventId, ...updates, status: 'updated' };
}

// 추천 상태 업데이트 (수락/미루기/제외)
export async function updateRecommendationStatus(id, status) {
  console.log('[calendar] updateRecommendationStatus (mock):', id, status);
  return { id, status };
}
