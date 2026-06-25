import { useEffect, useMemo, useState } from 'react';
import { INTERVENTION_STATUS } from '../constants/interventionStatus';
import { addMinutes, parseDurationMinutes, parseTime } from '../utils/time';
import {
  getInterventionStorageKey,
  getStableInterventionId,
  loadInterventionState,
  removeEmptyStateFields,
  saveInterventionState,
} from '../utils/interventionStorage';

const SNOOZE_MINUTES = 15;

export function usePlanRecommendationState({ baseRecommendations, showToast, closeToast }) {
  const storageKey = getInterventionStorageKey();
  const [state, setState] = useState(() => loadInterventionState(storageKey));
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    const tick = window.setInterval(() => setCurrentTime(Date.now()), 60 * 1000);
    return () => window.clearInterval(tick);
  }, []);

  const updateState = (id, nextState) => {
    setCurrentTime(Date.now());
    setState((prev) => {
      const updated = removeEmptyStateFields({
        ...prev[id],
        ...nextState,
        updatedAt: new Date().toISOString(),
      });
      const next = { ...prev, [id]: updated };
      saveInterventionState(next, storageKey);
      return next;
    });
  };

  const allRecommendations = useMemo(() => {
    return baseRecommendations
      .map((item) => {
        const id = getStableInterventionId(item);
        const saved = state[id] || {};
        const storedStatus = saved.status || item.status || INTERVENTION_STATUS.ACTIVE;
        const snoozeUntil = saved.snoozeUntil || null;
        const snoozeActive =
          storedStatus === INTERVENTION_STATUS.SNOOZED &&
          snoozeUntil &&
          new Date(snoozeUntil).getTime() > currentTime;
        const status =
          storedStatus === INTERVENTION_STATUS.SNOOZED && !snoozeActive
            ? INTERVENTION_STATUS.ACTIVE
            : storedStatus;
        const time = saved.time || item.time;

        return {
          ...item,
          id,
          time,
          endTime: addMinutes(time, parseDurationMinutes(item.title)),
          status,
          storedStatus,
          snoozeUntil,
          snoozeActive,
          dismissedAt: saved.dismissedAt,
          acceptedAt: saved.acceptedAt,
          movedAt: saved.movedAt,
          moved: Boolean(saved.time && saved.time !== item.time),
          originalTime: item.time,
        };
      })
      .sort((a, b) => parseTime(a.time) - parseTime(b.time));
  }, [baseRecommendations, currentTime, state]);

  const recommendations = useMemo(
    () => allRecommendations.filter((item) => item.status !== INTERVENTION_STATUS.DISMISSED),
    [allRecommendations],
  );

  const primaryRecommendation = useMemo(() => {
    const visible = recommendations.filter((item) => !item.snoozeActive);
    if (visible.length === 0) return recommendations[0] || null;
    return visible.reduce((best, item) => (item.riskReduction > best.riskReduction ? item : best));
  }, [recommendations]);

  const secondaryRecommendations = useMemo(
    () => recommendations.filter((item) => item.id !== primaryRecommendation?.id),
    [recommendations, primaryRecommendation],
  );

  const acceptRecommendation = (id) => {
    updateState(id, {
      status: INTERVENTION_STATUS.ACCEPTED,
      acceptedAt: new Date().toISOString(),
      previousStatus: undefined,
      dismissedAt: undefined,
      snoozeUntil: undefined,
    });
    showToast({ message: 'AI 추천 일정을 캘린더에 반영했습니다.' });
  };

  const moveRecommendation = async (id, nextTime) => {
    const target = allRecommendations.find((item) => item.id === id);
    if (!target) return;
    updateState(id, {
      status: target.status === INTERVENTION_STATUS.ACCEPTED ? INTERVENTION_STATUS.ACCEPTED : INTERVENTION_STATUS.ACTIVE,
      time: nextTime,
      movedAt: new Date().toISOString(),
      previousStatus: target.status,
      snoozeUntil: undefined,
      dismissedAt: undefined,
    });
    // 고도화 시 실제 API 호출로 교체
    const { createGoogleCalendarEvent, updateGoogleCalendarEvent } = await import('../api/calendar.js');
    if (target.status === INTERVENTION_STATUS.ACCEPTED) {
      await updateGoogleCalendarEvent(target.id, { startTime: nextTime });
    } else {
      await createGoogleCalendarEvent({ title: target.title, startTime: nextTime, endTime: target.endTime });
    }
    showToast({ message: `${nextTime}으로 이동했습니다. 캘린더에 반영됐습니다.` });
  };

  const delayRecommendation = (id) => {
    const target = allRecommendations.find((item) => item.id === id);
    if (!target) return;
    const nextTime = addMinutes(target.time, SNOOZE_MINUTES);
    const snoozeUntil = new Date(Date.now() + SNOOZE_MINUTES * 60 * 1000).toISOString();
    updateState(id, {
      status: INTERVENTION_STATUS.SNOOZED,
      time: nextTime,
      snoozeUntil,
      previousStatus: target.status,
      dismissedAt: undefined,
    });
    showToast({ message: `${nextTime}에 다시 알립니다.` });
  };

  const restoreDismissed = (id, previousState = {}) => {
    updateState(id, {
      status: previousState.previousStatus || previousState.status || INTERVENTION_STATUS.ACTIVE,
      time: previousState.time,
      snoozeUntil: previousState.snoozeUntil,
      acceptedAt: previousState.acceptedAt,
      movedAt: previousState.movedAt,
      previousStatus: undefined,
      dismissedAt: undefined,
    });
    closeToast();
  };

  const dismissRecommendation = (id) => {
    const previousState = state[id] || {};
    const previousStatus = previousState.status || INTERVENTION_STATUS.ACTIVE;
    updateState(id, {
      status: INTERVENTION_STATUS.DISMISSED,
      previousStatus,
      dismissedAt: new Date().toISOString(),
    });
    showToast({
      message: '오늘은 이 추천을 제외했습니다.',
      actionLabel: '되돌리기',
      onAction: () => restoreDismissed(id, { ...previousState, status: previousStatus }),
    });
  };

  return {
    allRecommendations,
    recommendations,
    primaryRecommendation,
    secondaryRecommendations,
    acceptRecommendation,
    moveRecommendation,
    delayRecommendation,
    dismissRecommendation,
  };
}
