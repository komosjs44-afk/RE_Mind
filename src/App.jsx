import { useMemo, useRef, useState } from 'react';
import { aiInterventions, burnoutPrediction, calendarData, dailyEvents, healthData } from './data/schedule';
import { useInterventionState } from './hooks/useInterventionState';
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

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [page, setPage] = useState('home');
  const [curY, setCurY] = useState(2026);
  const [curM, setCurM] = useState(5);
  const [selD, setSelD] = useState(16);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

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
    allInterventions,
    interventions,
    primaryIntervention,
    secondaryInterventions,
    acceptIntervention,
    moveIntervention,
    delayIntervention,
    dismissIntervention,
  } = useInterventionState({
    baseInterventions: aiInterventions[scenario],
    showToast,
    closeToast,
  });

  const timelineEvents = useMemo(() => {
    return [...dailyEvents[scenario], ...interventions.map((item) => ({ ...item, type: 'ai' }))]
      .sort((a, b) => parseTime(a.time) - parseTime(b.time));
  }, [interventions]);

  const notifications = useMemo(
    () => buildNotifications({
      prediction: burnoutPrediction[scenario],
      calendar: calendarData[scenario],
      interventions: allInterventions,
    }),
    [allInterventions],
  );

  const titles = {
    home: 'RE:Mind',
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
                  prediction={burnoutPrediction[scenario]}
                  healthData={healthData[scenario]}
                  dayEvents={timelineEvents}
                  primaryIntervention={primaryIntervention}
                  secondaryInterventions={secondaryInterventions}
                  acceptIntervention={acceptIntervention}
                  moveIntervention={moveIntervention}
                  delayIntervention={delayIntervention}
                  dismissIntervention={dismissIntervention}
                />
              )}
              {page === 'cal' && (
                <Calendar
                  events={timelineEvents}
                  calendarData={calendarData[scenario]}
                  prediction={burnoutPrediction[scenario]}
                  primaryIntervention={primaryIntervention}
                  acceptIntervention={acceptIntervention}
                  delayIntervention={delayIntervention}
                  curY={curY}
                  curM={curM}
                  selD={selD}
                  setCurY={setCurY}
                  setCurM={setCurM}
                  setSelD={setSelD}
                />
              )}
              {page === 'anal' && (
                <Analysis
                  prediction={burnoutPrediction[scenario]}
                  healthData={healthData[scenario]}
                  calendarData={calendarData[scenario]}
                  interventions={allInterventions}
                  onGoHome={() => setPage('home')}
                />
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

function buildNotifications({ prediction, calendar, interventions }) {
  const items = [];

  if (calendar.meetingCount >= 6) {
    items.push({
      id: 'calendar-density',
      title: '오늘 회의 밀도가 높습니다.',
      detail: `${calendar.meetingCount}개 일정과 ${calendar.continuousMeetingBlocks}개 연속 회의 블록이 감지됐어요.`,
    });
  }

  if (prediction.currentRiskScore >= 61) {
    items.push({
      id: 'risk-score',
      title: '오후 집중 저하 가능성이 높습니다.',
      detail: `${prediction.predictedPeakRiskTime} 구간에 회복 행동을 넣어보세요.`,
    });
  }

  interventions
    .filter((item) => item.snoozeActive && item.status !== 'dismissed')
    .forEach((item) => {
      items.push({
        id: `snooze-${item.id}`,
        title: '15분 뒤 다시 볼 행동이 있습니다.',
        detail: `${item.title} · ${item.time}`,
      });
    });

  return items;
}
