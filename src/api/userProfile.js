import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'replan_personal_info';

export const defaultProfile = {
  name: '',
  studentId: '',
  major: '',
  semester: '',
  wakeTime: '07:30',
  sleepTime: '01:00',
  focusWindow: '09:00~12:00',
  avoidNotification: '23:00~07:30',
  workDaysPerWeek: '3',
  workHoursPerDay: '5',
  recoveryRoutine: '짧은 산책, 스트레칭',
  burnoutSignal: '수면 부족, 알바 직후 과제, 시험 전날 벼락치기',
};

export async function fetchUserProfile() {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export async function saveUserProfile(profile) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  return profile;
}
