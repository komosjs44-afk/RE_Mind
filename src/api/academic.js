import AsyncStorage from '@react-native-async-storage/async-storage';
import { academicTasks } from '../data/schedule';

const STORAGE_KEY = 'replan_academic_tasks';

export async function fetchAcademicTasks() {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return parsed.length ? parsed : academicTasks;
  } catch {
    return academicTasks;
  }
}

export async function createAcademicTask(task) {
  const tasks = await fetchAcademicTasks();
  const next = [...tasks, { ...task, id: `task_${Date.now()}` }];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export async function updateAcademicTask(id, updates) {
  const tasks = await fetchAcademicTasks();
  const next = tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export async function deleteAcademicTask(id) {
  const tasks = await fetchAcademicTasks();
  const next = tasks.filter((t) => t.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
