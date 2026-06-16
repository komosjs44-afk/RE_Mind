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

export function useInterventionState({ baseInterventions, showToast, closeToast }) {
  const storageKey = getInterventionStorageKey();
  const [interventionState, setInterventionState] = useState(() => loadInterventionState(storageKey));
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    const tick = window.setInterval(() => setCurrentTime(Date.now()), 60 * 1000);
    return () => window.clearInterval(tick);
  }, []);

  const updateInterventionState = (id, nextState) => {
    setCurrentTime(Date.now());
    setInterventionState((prev) => {
      const updatedEntry = removeEmptyStateFields({
        ...prev[id],
        ...nextState,
        updatedAt: new Date().toISOString(),
      });
      const updated = { ...prev, [id]: updatedEntry };
      saveInterventionState(updated, storageKey);
      return updated;
    });
  };

  const allInterventions = useMemo(() => {
    return baseInterventions
      .map((item) => {
        const id = getStableInterventionId(item);
        const state = interventionState[id] || {};
        const storedStatus = state.status || item.status || INTERVENTION_STATUS.ACTIVE;
        const snoozeUntil = state.snoozeUntil || null;
        const snoozeActive =
          storedStatus === INTERVENTION_STATUS.SNOOZED &&
          snoozeUntil &&
          new Date(snoozeUntil).getTime() > currentTime;
        const status =
          storedStatus === INTERVENTION_STATUS.SNOOZED && !snoozeActive
            ? INTERVENTION_STATUS.ACTIVE
            : storedStatus;
        const time = state.time || item.time;

        return {
          ...item,
          id,
          time,
          endTime: addMinutes(time, parseDurationMinutes(item.title)),
          status,
          storedStatus,
          snoozeUntil,
          snoozeActive,
          dismissedAt: state.dismissedAt,
          acceptedAt: state.acceptedAt,
          movedAt: state.movedAt,
          moved: Boolean(state.time && state.time !== item.time),
          originalTime: item.time,
        };
      })
      .sort((a, b) => parseTime(a.time) - parseTime(b.time));
  }, [baseInterventions, currentTime, interventionState]);

  const interventions = useMemo(
    () => allInterventions.filter((item) => item.status !== INTERVENTION_STATUS.DISMISSED),
    [allInterventions],
  );

  const primaryIntervention = useMemo(() => {
    const visible = interventions.filter((item) => !item.snoozeActive);
    if (visible.length === 0) return interventions[0] || null;
    return visible.reduce((best, item) => (item.riskReduction > best.riskReduction ? item : best));
  }, [interventions]);

  const secondaryInterventions = useMemo(
    () => interventions.filter((item) => item.id !== primaryIntervention?.id),
    [interventions, primaryIntervention],
  );

  const acceptIntervention = (id) => {
    updateInterventionState(id, {
      status: INTERVENTION_STATUS.ACCEPTED,
      acceptedAt: new Date().toISOString(),
      previousStatus: undefined,
      dismissedAt: undefined,
      snoozeUntil: undefined,
    });
    showToast({ message: 'AI 제안을 오늘 일정에 반영했습니다.' });
  };

  const moveIntervention = (id, nextTime) => {
    const target = allInterventions.find((item) => item.id === id);
    if (!target) return;

    updateInterventionState(id, {
      status: target.status === INTERVENTION_STATUS.ACCEPTED ? INTERVENTION_STATUS.ACCEPTED : INTERVENTION_STATUS.ACTIVE,
      time: nextTime,
      movedAt: new Date().toISOString(),
      previousStatus: target.status,
      snoozeUntil: undefined,
      dismissedAt: undefined,
    });
    showToast({ message: `${nextTime} 일정으로 이동했습니다. 캘린더에 반영됩니다.` });
  };

  const delayIntervention = (id) => {
    const target = allInterventions.find((item) => item.id === id);
    if (!target) return;

    const nextTime = addMinutes(target.time, SNOOZE_MINUTES);
    const snoozeUntil = new Date(Date.now() + SNOOZE_MINUTES * 60 * 1000).toISOString();

    updateInterventionState(id, {
      status: INTERVENTION_STATUS.SNOOZED,
      time: nextTime,
      snoozeUntil,
      previousStatus: target.status,
      dismissedAt: undefined,
    });
    showToast({ message: `${nextTime}에 다시 볼 수 있게 15분 뒤로 미뤘습니다.` });
  };

  const restoreDismissedIntervention = (id, previousState = {}) => {
    updateInterventionState(id, {
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

  const dismissIntervention = (id) => {
    const previousState = interventionState[id] || {};
    const previousStatus = previousState.status || INTERVENTION_STATUS.ACTIVE;

    updateInterventionState(id, {
      status: INTERVENTION_STATUS.DISMISSED,
      previousStatus,
      dismissedAt: new Date().toISOString(),
    });

    showToast({
      message: '오늘은 이 개입을 제외했습니다.',
      actionLabel: '되돌리기',
      onAction: () => restoreDismissedIntervention(id, { ...previousState, status: previousStatus }),
    });
  };

  return {
    interventionState,
    allInterventions,
    interventions,
    primaryIntervention,
    secondaryInterventions,
    acceptIntervention,
    moveIntervention,
    delayIntervention,
    dismissIntervention,
  };
}
