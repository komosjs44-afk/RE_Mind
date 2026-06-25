import { calendarEvents, calendarSummary } from '../data/schedule';

export async function fetchGoogleCalendarEvents() {
  return calendarEvents.elevated;
}

export async function fetchCalendarSummary() {
  return calendarSummary.elevated;
}

export async function createGoogleCalendarEvent(event) {
  console.log('[calendar] createGoogleCalendarEvent (mock):', event);
  return { id: `gcal_${Date.now()}`, ...event, status: 'created' };
}

export async function updateGoogleCalendarEvent(eventId, updates) {
  console.log('[calendar] updateGoogleCalendarEvent (mock):', eventId, updates);
  return { id: eventId, ...updates, status: 'updated' };
}

export async function updateRecommendationStatus(id, status) {
  console.log('[calendar] updateRecommendationStatus (mock):', id, status);
  return { id, status };
}
