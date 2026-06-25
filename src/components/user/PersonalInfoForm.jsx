import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'replan_personal_info';

const defaultProfile = {
  name: '김대학',
  age: '21',
  major: '컴퓨터공학',
  studyStyle: '과제+시험 병행',
  wakeTime: '08:00',
  sleepTime: '01:00',
  focusWindow: '14:00~17:00',
  avoidNotification: '23:00~08:00',
  recoveryRoutine: '짧은 산책, 스트레칭',
  overloadSignal: '수면 부족, 알바+시험 겹침, 과제 마감 연속',
};

export default function PersonalInfoForm() {
  const [profile, setProfile] = useState(defaultProfile);
  const [draft, setDraft] = useState(defaultProfile);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateField = (key, value) => {
    setSaved(false);
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const startEdit = () => { setDraft(profile); setEditing(true); setSaved(false); };
  const cancelEdit = () => { setDraft(profile); setEditing(false); setSaved(false); };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      setProfile(draft);
      setEditing(false);
      setSaved(true);
    } catch (error) {
      console.error('Failed to save profile', error);
    }
  };

  const visibleProfile = editing ? draft : profile;

  return (
    <View className="mx-4 mt-3 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">프로필 입력값</Text>
          <Text className="mt-1 text-[17px] font-bold text-text-primary">예측에 연결되는 정보</Text>
        </View>
        {saved && (
          <View className="rounded-full bg-ai-soft px-2 py-1">
            <Text className="text-[10px] font-semibold text-ai">저장됨</Text>
          </View>
        )}
      </View>

      <View className="mt-4 flex-row gap-2">
        <Field label="이름" value={visibleProfile.name} editable={editing} onChangeText={(v) => updateField('name', v)} />
        <Field label="나이" value={visibleProfile.age} editable={editing} onChangeText={(v) => updateField('age', v)} />
      </View>
      <View className="mt-2 gap-2">
        <Field label="전공" value={visibleProfile.major} editable={editing} onChangeText={(v) => updateField('major', v)} />
        <Field label="학습 스타일" value={visibleProfile.studyStyle} editable={editing} onChangeText={(v) => updateField('studyStyle', v)} />
        <Field label="집중 선호 시간" value={visibleProfile.focusWindow} editable={editing} onChangeText={(v) => updateField('focusWindow', v)} />
        <Field label="알림 회피 시간" value={visibleProfile.avoidNotification} editable={editing} onChangeText={(v) => updateField('avoidNotification', v)} />
        <Field label="회복 선호" value={visibleProfile.recoveryRoutine} editable={editing} onChangeText={(v) => updateField('recoveryRoutine', v)} />
        <Field label="과부하 신호" value={visibleProfile.overloadSignal} editable={editing} onChangeText={(v) => updateField('overloadSignal', v)} multiline />
      </View>

      {editing ? (
        <View className="mt-4 flex-row gap-2">
          <Pressable
            className="flex-1 h-[52px] items-center justify-center rounded-[20px] border border-border bg-bg"
            onPress={cancelEdit}
          >
            <Text className="text-[13px] font-semibold text-text-primary">취소</Text>
          </Pressable>
          <Pressable
            className="flex-1 h-[52px] items-center justify-center rounded-[20px] bg-navy"
            onPress={saveProfile}
          >
            <Text className="text-[13px] font-bold text-white">저장</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          className="mt-4 h-[52px] flex-row items-center justify-center gap-1.5 rounded-[20px] bg-navy"
          onPress={startEdit}
        >
          <Text className="text-[13px] font-bold text-white">내 패턴 수정</Text>
        </Pressable>
      )}
    </View>
  );
}

function Field({ label, value, editable, onChangeText, multiline = false }) {
  return (
    <View className="flex-1 rounded-[18px] bg-bg px-3 py-2.5">
      <Text className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{label}</Text>
      <TextInput
        className="mt-1 text-[13px] font-medium text-text-primary"
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        multiline={multiline}
        style={{ minHeight: multiline ? 48 : undefined }}
      />
    </View>
  );
}
