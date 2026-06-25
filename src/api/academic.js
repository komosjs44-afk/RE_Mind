import { academicTasks } from '../data/schedule';

const STORAGE_KEY = 'remind_academic_tasks';

// MVP: localStorage + mock. 고도화 시 Supabase 조회로 교체
export async function fetchAcademicTasks() {
  const saved = loadLocalTasks();
  return saved.length ? saved : academicTasks;
}

export async function createAcademicTask(task) {
  const tasks = await fetchAcademicTasks();
  const next = [...tasks, { ...task, id: `task_${Date.now()}` }];
  saveLocalTasks(next);
  return next;
}

export async function updateAcademicTask(id, updates) {
  const tasks = await fetchAcademicTasks();
  const next = tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
  saveLocalTasks(next);
  return next;
}

export async function deleteAcademicTask(id) {
  const tasks = await fetchAcademicTasks();
  const next = tasks.filter((t) => t.id !== id);
  saveLocalTasks(next);
  return next;
}

function loadLocalTasks() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveLocalTasks(tasks) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
