export function getTodayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getInterventionStorageKey(date = new Date()) {
  return `remind_intervention_state_${getTodayKey(date)}`;
}

export function getStableInterventionId(intervention) {
  if (intervention.id) return intervention.id;
  if (intervention.type && intervention.title) return `${intervention.type}_${intervention.title}`;
  return `${intervention.title}_${intervention.time}`;
}

export function removeEmptyStateFields(state) {
  return Object.fromEntries(
    Object.entries(state).filter(([, value]) => value !== undefined && value !== null),
  );
}

function canUseLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function loadInterventionState(storageKey = getInterventionStorageKey()) {
  if (!canUseLocalStorage()) return {};

  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return {};

    const parsed = JSON.parse(saved);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch (error) {
    console.error('Failed to restore intervention state', error);
    return {};
  }
}

export function saveInterventionState(nextState, storageKey = getInterventionStorageKey()) {
  if (!canUseLocalStorage()) return;

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(nextState));
  } catch (error) {
    console.error('Failed to save intervention state', error);
  }
}
