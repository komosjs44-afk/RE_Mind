import { useMemo, useRef, useState } from 'react';
import {
  overloadAnalysis,
  aiPlanRecommendations,
  calendarSummary,
  calendarEvents,
  dailyPlan,
  healthSummary,
  academicTasks,
} from '../data/schedule';
import { usePlanRecommendationState } from './usePlanRecommendationState';
import { parseTime } from '../utils/time';

const scenario = 'elevated';
const TOAST_DURATION = 5200;
const RECALCULATE_DELAY = 1800;

export function useAppState() {
  const [toast, setToast] = useState(null);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const toastTimerRef = useRef(null);
  const recalcTimerRef = useRef(null);

  const closeToast = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(null);
  };

  const showToast = ({ message, actionLabel, onAction }) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, actionLabel, onAction });
    toastTimerRef.current = setTimeout(() => setToast(null), TOAST_DURATION);
  };

  const {
    allRecommendations,
    recommendations,
    primaryRecommendation,
    secondaryRecommendations,
    acceptRecommendation,
    moveRecommendation,
    delayRecommendation,
    dismissRecommendation,
  } = usePlanRecommendationState({
    baseRecommendations: aiPlanRecommendations[scenario],
    showToast,
    closeToast,
  });

  const handleMoveRecommendation = async (id, newTime) => {
    await moveRecommendation(id, newTime);
    setIsRecalculating(true);
    if (recalcTimerRef.current) clearTimeout(recalcTimerRef.current);
    recalcTimerRef.current = setTimeout(() => {
      setIsRecalculating(false);
      showToast({ message: 'AI가 나머지 일정을 재설계했습니다.' });
    }, RECALCULATE_DELAY);
  };

  const timelineEvents = useMemo(() => {
    return [...(dailyPlan[scenario] ?? []), ...recommendations.map((item) => ({ ...item, type: 'ai' }))]
      .sort((a, b) => parseTime(a.time) - parseTime(b.time));
  }, [recommendations]);

  const notifications = useMemo(
    () => buildNotifications({ overload: overloadAnalysis[scenario], calendar: calendarSummary[scenario], recommendations: allRecommendations }),
    [allRecommendations],
  );

  return {
    overload: overloadAnalysis[scenario],
    health: healthSummary[scenario],
    calendarSummary: calendarSummary[scenario],
    calendarEvents: calendarEvents[scenario],
    academicTasks,
    timelineEvents,
    notifications,
    primaryRecommendation,
    secondaryRecommendations,
    isRecalculating,
    toast,
    acceptRecommendation,
    moveRecommendation: handleMoveRecommendation,
    delayRecommendation,
    dismissRecommendation,
    closeToast,
  };
}

function buildNotifications({ overload, calendar, recommendations }) {
  const items = [];
  if (calendar?.workHours >= 4) {
    items.push({ id: 'work-overload', title: '오늘 알바 시간이 깁니다.', detail: `알바 ${calendar.workHours}시간으로 시험 준비 시간이 부족합니다.` });
  }
  if (overload?.currentRiskScore >= 65) {
    items.push({ id: 'overload-score', title: '오늘 일정 과부하 가능성이 높습니다.', detail: `${overload.predictedPeakRiskTime} 구간 전에 AI 추천 일정을 반영해보세요.` });
  }
  recommendations
    .filter((item) => item.snoozeActive && item.status !== 'dismissed')
    .forEach((item) => {
      items.push({ id: `snooze-${item.id}`, title: '15분 뒤 다시 볼 추천 일정이 있습니다.', detail: `${item.title} · ${item.time}` });
    });
  return items;
}
