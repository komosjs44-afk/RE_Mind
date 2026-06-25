import { useMemo, useRef, useState } from 'react';
import {
  overloadAnalysis,
  aiPlanRecommendations,
  calendarSummary,
  calendarEvents,
  dailyPlan,
  healthSummary,
  dataSourceSummary,
  academicTasks,
} from './data/schedule';

import { usePlanRecommendationState } from './hooks/usePlanRecommendationState';
import { parseTime } from './utils/time';
import StartScreen from './components/onboarding/StartScreen';
import Header from './components/Header';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Analysis from './components/Analysis';
import UserInfo from './components/UserInfo';
import BottomNav from './components/BottomNav';
import Toast from './components/ui/Toast';

const scenario = 'elevated';
const TOAST_DURATION = 5200;
const RECALCULATE_DELAY = 1800;

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [page, setPage] = useState('home');
  const [curY, setCurY] = useState(2026);
  const [curM, setCurM] = useState(5);
  const [selD, setSelD] = useState(16);
  const [toast, setToast] = useState(null);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const toastTimerRef = useRef(null);
  const recalcTimerRef = useRef(null);

  const closeToast = () => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToast(null);
  };

  const showToast = ({ message, actionLabel, onAction }) => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToast({ message, actionLabel, onAction });
    toastTimerRef.current = window.setTimeout(() => setToast(null), TOAST_DURATION);
  };

  const {
    allRecommendations,
    recommendations,
    primaryRecommendation,
    secondaryRecommendations,
    acceptRecommendation,
    moveRecommendation,
    delayRecommendation,
    dismissRecommendation,
  } = usePlanRecommendationState({
    baseRecommendations: aiPlanRecommendations[scenario],
    showToast,
    closeToast,
  });

  const handleMoveRecommendation = async (id, newTime) => {
    await moveRecommendation(id, newTime);
    setIsRecalculating(true);
    if (recalcTimerRef.current) window.clearTimeout(recalcTimerRef.current);
    recalcTimerRef.current = window.setTimeout(() => {
      setIsRecalculating(false);
      showToast({ message: 'AI가 나머지 일정을 재설계했습니다.' });
    }, RECALCULATE_DELAY);
  };

  const timelineEvents = useMemo(() => {
    return [...(dailyPlan[scenario] ?? []), ...recommendations.map((item) => ({ ...item, type: 'ai' }))]
      .sort((a, b) => parseTime(a.time) - parseTime(b.time));
  }, [recommendations]);

  const notifications = useMemo(
    () => buildNotifications({
      overload: overloadAnalysis[scenario],
      calendar: calendarSummary[scenario],
      recommendations: allRecommendations,
    }),
    [allRecommendations],
  );

  const titles = {
    home: 'RE:Plan',
    cal: '캘린더',
    anal: 'AI 분석',
    user: '내 정보',
  };

  return (
    <div className="app-shell flex min-h-screen items-start justify-center bg-bg p-6">
      <div className="phone-frame h-[932px] w-[430px] max-w-full rounded-[48px] border border-black/10 bg-navy p-3 shadow-[0_24px_70px_rgba(17,24,39,0.25)]">
        <div className="phone-screen relative h-full overflow-hidden rounded-[38px] border border-black/5 bg-bg">
          {!hasStarted ? (
            <div className="flex h-full flex-col">
              <div className="absolute left-1/2 top-3 z-10 h-9 w-[126px] -translate-x-1/2 rounded-full bg-black" />
              <div className="flex items-end justify-between px-6 pb-2 pt-[16px] text-[12px] font-medium text-text-primary">
                <span>9:41</span>
                <span className="inline-flex gap-1">
                  <i className="ti ti-wifi" /> <i className="ti ti-battery" />
                </span>
              </div>
              <StartScreen onStart={() => setHasStarted(true)} />
            </div>
          ) : (
            <>
              <Header title={titles[page]} notifications={notifications} />
              {page === 'home' && (
                <Home
                  overload={overloadAnalysis[scenario]}
                  health={healthSummary[scenario]}
                  calendarSummary={calendarSummary[scenario]}
                  calendarEvents={calendarEvents[scenario]}
                  academicTasks={academicTasks}
                  primaryRecommendation={primaryRecommendation}
                  secondaryRecommendations={secondaryRecommendations}
                  isRecalculating={isRecalculating}
                  acceptRecommendation={acceptRecommendation}
                  moveRecommendation={handleMoveRecommendation}
                  delayRecommendation={delayRecommendation}
                  dismissRecommendation={dismissRecommendation}
                />
              )}
              {page === 'cal' && (
                <Calendar
                  events={timelineEvents}
                  calendarData={calendarSummary[scenario]}
                  curY={curY}
                  curM={curM}
                  selD={selD}
                  setCurY={setCurY}
                  setCurM={setCurM}
                  setSelD={setSelD}
                />
              )}
              {page === 'anal' && (
                <Analysis overload={overloadAnalysis[scenario]} />
              )}
              {page === 'user' && <UserInfo />}
              <BottomNav page={page} setPage={setPage} />
            </>
          )}
        </div>
      </div>
      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}

function buildNotifications({ overload, calendar, recommendations }) {
  const items = [];

  if (calendar?.workHours >= 4) {
    items.push({
      id: 'work-overload',
      title: '오늘 알바 시간이 깁니다.',
      detail: `알바 ${calendar.workHours}시간으로 시험 준비 시간이 부족합니다.`,
    });
  }

  if (overload?.currentRiskScore >= 65) {
    items.push({
      id: 'overload-score',
      title: '오늘 일정 과부하 가능성이 높습니다.',
      detail: `${overload.predictedPeakRiskTime} 구간 전에 AI 추천 일정을 반영해보세요.`,
    });
  }

  recommendations
    .filter((item) => item.snoozeActive && item.status !== 'dismissed')
    .forEach((item) => {
      items.push({
        id: `snooze-${item.id}`,
        title: '15분 뒤 다시 볼 추천 일정이 있습니다.',
        detail: `${item.title} · ${item.time}`,
      });
    });

  return items;
}
