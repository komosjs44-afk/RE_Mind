import { useState } from 'react';
import Button from '../ui/Button';

const STORAGE_KEY = 'remind_personal_info';

const defaultProfile = {
  name: '정서비',
  age: '29',
  job: 'Product Designer',
  workStyle: '회의가 많은 지식 근로',
  wakeTime: '07:30',
  sleepTime: '00:30',
  focusWindow: '09:30~11:30',
  avoidNotification: '22:30~07:30',
  recoveryRoutine: '짧은 산책, 호흡, 스트레칭',
  screenTimeGoal: '자정 이후 20분 이하',
  burnoutSignal: '수면 부족, 오후 회의 연속, 야간 릴스 사용',
};

export default function PersonalInfoForm() {
  const [profile, setProfile] = useState(loadPersonalInfo);
  const [draft, setDraft] = useState(profile);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateField = (key, value) => {
    setSaved(false);
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
    setSaved(false);
  };

  const cancelEdit = () => {
    setDraft(profile);
    setEditing(false);
    setSaved(false);
  };

  const saveProfile = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      setProfile(draft);
      setEditing(false);
      setSaved(true);
    } catch (error) {
      console.error('Failed to save personal info', error);
    }
  };

  const visibleProfile = editing ? draft : profile;

  return (
    <section className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">프로필 입력값</span>
          <h2 className="mt-1 text-[17px] font-semibold text-text-primary">예측에 연결되는 정보</h2>
        </div>
        {saved && <span className="rounded-full bg-ai-soft px-2 py-1 text-[10px] font-medium text-ai">저장됨</span>}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Field label="이름" value={visibleProfile.name} disabled={!editing} onChange={(value) => updateField('name', value)} />
        <Field label="나이" value={visibleProfile.age} disabled={!editing} onChange={(value) => updateField('age', value)} />
      </div>

      <div className="mt-2 grid gap-2">
        <Field label="직무 / 역할" value={visibleProfile.job} disabled={!editing} onChange={(value) => updateField('job', value)} />
        <Field label="업무 스타일" value={visibleProfile.workStyle} disabled={!editing} onChange={(value) => updateField('workStyle', value)} />
        <Field label="집중 선호 시간" value={visibleProfile.focusWindow} disabled={!editing} onChange={(value) => updateField('focusWindow', value)} />
        <Field label="알림 회피 시간" value={visibleProfile.avoidNotification} disabled={!editing} onChange={(value) => updateField('avoidNotification', value)} />
        <Field label="회복 선호" value={visibleProfile.recoveryRoutine} disabled={!editing} onChange={(value) => updateField('recoveryRoutine', value)} />
        <Field label="야간 스크린 목표" value={visibleProfile.screenTimeGoal} disabled={!editing} onChange={(value) => updateField('screenTimeGoal', value)} />
        <Textarea label="번아웃 신호" value={visibleProfile.burnoutSignal} disabled={!editing} onChange={(value) => updateField('burnoutSignal', value)} />
      </div>

      {editing ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="secondary" className="min-h-[52px]" onClick={cancelEdit}>취소</Button>
          <Button variant="primary" className="min-h-[52px]" onClick={saveProfile}>저장</Button>
        </div>
      ) : (
        <Button variant="primary" className="mt-4 w-full" icon="edit" onClick={startEdit}>
          내 패턴 수정
        </Button>
      )}
    </section>
  );
}

function loadPersonalInfo() {
  if (typeof window === 'undefined') return defaultProfile;

  try {
    const savedProfile = window.localStorage.getItem(STORAGE_KEY);
    return savedProfile ? { ...defaultProfile, ...JSON.parse(savedProfile) } : defaultProfile;
  } catch (error) {
    console.error('Failed to load personal info', error);
    return defaultProfile;
  }
}

function Field({ label, value, disabled, onChange }) {
  return (
    <label className="block rounded-[18px] bg-bg px-3 py-2.5">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">{label}</span>
      <input
        className="mt-1 w-full bg-transparent text-[13px] font-medium text-text-primary outline-none disabled:text-text-primary"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function Textarea({ label, value, disabled, onChange }) {
  return (
    <label className="block rounded-[18px] bg-bg px-3 py-2.5">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">{label}</span>
      <textarea
        className="mt-1 min-h-16 w-full resize-none bg-transparent text-[13px] font-medium text-text-primary outline-none disabled:text-text-primary"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
