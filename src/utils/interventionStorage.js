import AsyncStorage from '@react-native-async-storage/async-storage';

export function getTodayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getInterventionStorageKey(date = new Date()) {
  return `replan_intervention_state_${getTodayKey(date)}`;
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

// Sync in-memory fallback (used for useState initializer)
export function loadInterventionStateSync() {
  return {};
}

export async function loadInterventionState(storageKey) {
  try {
    const saved = await AsyncStorage.getItem(storageKey);
    if (!saved) return {};
    const parsed = JSON.parse(saved);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export async function saveInterventionState(nextState, storageKey) {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(nextState));
  } catch (error) {
    console.error('Failed to save intervention state', error);
  }
}
