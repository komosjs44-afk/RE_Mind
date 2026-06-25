import { aiPlanRecommendations, overloadAnalysis } from '../data/schedule';

// MVP: mock 반환. 고도화 시 AI 엔진 API 호출로 교체
export async function generateAIPlan({ healthSummary, calendarEvents, academicTasks }) {
  // TODO: POST /api/ai/plan with payload
  // payload: { healthSummary, calendarEvents, academicTasks }
  console.log('[aiPlan] generateAIPlan (mock):', { healthSummary, calendarEvents, academicTasks });
  return {
    recommendations: aiPlanRecommendations.elevated,
    overloadAnalysis: overloadAnalysis.elevated,
  };
}

export async function fetchAIPlanRecommendations(scenario = 'elevated') {
  return aiPlanRecommendations[scenario] ?? aiPlanRecommendations.elevated;
}

export async function fetchOverloadAnalysis(scenario = 'elevated') {
  return overloadAnalysis[scenario] ?? overloadAnalysis.elevated;
}

// 추천 수락 시 호출 — Google Calendar 생성과 상태 업데이트를 묶음 처리
export async function acceptRecommendation(recommendation) {
  const { createGoogleCalendarEvent, updateRecommendationStatus } = await import('./calendar.js');
  await createGoogleCalendarEvent({
    title: recommendation.title,
    startTime: recommendation.time,
    endTime: recommendation.endTime,
  });
  await updateRecommendationStatus(recommendation.id, 'accepted');
  return recommendation;
}
