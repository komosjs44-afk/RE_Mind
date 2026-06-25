import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../src/context/AppContext';
import Header from '../../src/components/Header';
import MiniMonthPicker from '../../src/components/calendar/MiniMonthPicker';
import DayTimeline from '../../src/components/calendar/DayTimeline';
import CalendarEmptyState from '../../src/components/calendar/CalendarEmptyState';
import { parseTime } from '../../src/utils/time';
import Toast from '../../src/components/ui/Toast';

export default function CalendarScreen() {
  const { timelineEvents, calendarSummary, notifications, toast, closeToast } = useApp();
  const [curY, setCurY] = useState(2026);
  const [curM, setCurM] = useState(5);
  const [selD, setSelD] = useState(16);

  const isToday = curY === 2026 && curM === 5 && selD === 16;
  const dayEvents = isToday ? timelineEvents : getMockFutureEvents(selD);
  const sortedEvents = [...dayEvents].sort((a, b) => parseTime(a.time) - parseTime(b.time));
  const hasRiskWindow = isToday && calendarSummary?.overloadTimeRange?.includes('~');

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <Header title="캘린더" notifications={notifications} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <MiniMonthPicker
          curY={curY} curM={curM} selD={selD}
          setCurY={setCurY} setCurM={setCurM} setSelD={setSelD}
        />
        <View className="mx-4 mb-4 mt-3 rounded-[24px] border border-border bg-card p-3 shadow-sm">
          <View className="flex-row items-center justify-between px-1 pb-3">
            <View>
              <Text className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">시간축 탐색</Text>
              <Text className="text-[16px] font-bold text-text-primary">
                {String(curM + 1).padStart(2, '0')}월 {selD}일
              </Text>
            </View>
            <View className="items-end gap-1">
              <View className="rounded-full bg-ai-soft px-3 py-1">
                <Text className="text-[11px] font-bold text-ai">{dayEvents.length}개 일정</Text>
              </View>
              {hasRiskWindow && (
                <View className="rounded-full bg-risk-soft px-3 py-1">
                  <Text className="text-[11px] font-bold text-risk">{calendarSummary.overloadTimeRange} 과부하</Text>
                </View>
              )}
            </View>
          </View>
          {dayEvents.length === 0 ? <CalendarEmptyState /> : <DayTimeline events={sortedEvents} />}
        </View>
      </ScrollView>
      <Toast toast={toast} onClose={closeToast} />
    </SafeAreaView>
  );
}

function getMockFutureEvents(day) {
  const events = {
    2: [{ title:'월간 목표 점검', time:'09:30', sub:'45분 회의', type:'normal' },{ title:'치과 예약', time:'12:30', sub:'1시간', type:'normal' }],
    3: [{ title:'출근길 이동', time:'08:00', sub:'45분', type:'normal' },{ title:'자료 정리', time:'13:30', sub:'1시간', type:'normal' }],
    5: [{ title:'제품 스펙 리뷰', time:'09:00', sub:'1시간', type:'normal' },{ title:'팀 점심', time:'12:00', sub:'1시간', type:'normal' }],
    6: [{ title:'원온원', time:'10:30', sub:'30분 회의', type:'normal' },{ title:'병원 예약', time:'15:00', sub:'1시간', type:'normal' }],
    8: [{ title:'주간 킥오프', time:'09:00', sub:'45분 회의', type:'normal' },{ title:'저녁 약속', time:'19:00', sub:'1시간 30분', type:'normal' }],
    10: [{ title:'디자인 QA', time:'09:30', sub:'1시간', type:'normal' },{ title:'점심 산책', time:'12:20', sub:'AI 회복 루틴', type:'ai' }],
    12: [{ title:'오전 회의 블록', time:'09:00', sub:'2시간', type:'normal', risk:true },{ title:'긴급 수정', time:'16:00', sub:'1시간', type:'normal', risk:true }],
    13: [{ title:'세탁/집안일', time:'10:00', sub:'1시간', type:'normal' },{ title:'카페 작업', time:'14:00', sub:'2시간', type:'normal' }],
    15: [{ title:'월요일 스탠드업', time:'09:00', sub:'30분', type:'normal' },{ title:'기획서 마감', time:'15:00', sub:'2시간', type:'normal', risk:true }],
    17: [{ title:'기획 리뷰', time:'10:00', sub:'45분', type:'normal' },{ title:'팀 점심', time:'12:00', sub:'1시간', type:'normal' }],
    18: [{ title:'아침 운동', time:'07:30', sub:'40분', type:'normal' },{ title:'연속 회의 블록', time:'14:00', sub:'2시간', type:'normal', risk:true }],
    19: [{ title:'주간 회고', time:'09:30', sub:'1시간', type:'normal' },{ title:'저녁 약속', time:'19:00', sub:'2시간', type:'normal' }],
    20: [{ title:'주간 광고 회의', time:'09:00', sub:'1시간', type:'normal' },{ title:'파워존 보호', time:'10:30', sub:'AI 회복 루틴', type:'ai', status:'accepted' }],
    22: [{ title:'신규 캠페인 킥오프', time:'09:00', sub:'1시간', type:'normal' },{ title:'필라테스', time:'19:30', sub:'1시간', type:'normal' }],
    23: [{ title:'회의 1', time:'09:00', sub:'45분', type:'normal', risk:true },{ title:'회복 블록', time:'12:20', sub:'AI 회복 루틴', type:'ai' }],
    24: [{ title:'자료 리서치', time:'09:30', sub:'1시간 30분', type:'normal' },{ title:'치과 정기검진', time:'17:30', sub:'1시간', type:'normal' }],
    25: [{ title:'제품 리뷰', time:'09:00', sub:'1시간', type:'normal' },{ title:'파트너 미팅', time:'10:30', sub:'1시간', type:'normal', risk:true }],
    27: [{ title:'청소/정리', time:'09:30', sub:'1시간', type:'normal' },{ title:'가족 약속', time:'12:00', sub:'2시간', type:'normal' }],
    29: [{ title:'월말 보고', time:'09:00', sub:'1시간', type:'normal', risk:true },{ title:'외부 미팅', time:'14:00', sub:'1시간 30분', type:'normal' }],
    30: [{ title:'월말 회고', time:'10:00', sub:'1시간', type:'normal' },{ title:'운동', time:'18:30', sub:'1시간', type:'normal' }],
  };
  return events[day] || [];
}
