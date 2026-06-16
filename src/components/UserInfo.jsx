import AIProfileHero from './user/AIProfileHero';
import PersonalRhythmCard from './user/PersonalRhythmCard';
import PersonalInfoForm from './user/PersonalInfoForm';
import ConnectedSources from './user/ConnectedSources';
import PrivacyNotice from './user/PrivacyNotice';

export default function UserInfo() {
  return (
    <main className="page no-scrollbar h-[calc(100%-112px)] overflow-y-auto pb-24">
      <AIProfileHero />
      <PersonalRhythmCard />
      <PersonalInfoForm />
      <ConnectedSources />
      <PrivacyNotice />
    </main>
  );
}
