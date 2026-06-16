import AIProfileHero from './user/AIProfileHero';
import PersonalInfoForm from './user/PersonalInfoForm';
import RecoveryPreferences from './user/RecoveryPreferences';
import ConnectedSources from './user/ConnectedSources';

export default function UserInfo() {
  return (
    <main className="page no-scrollbar h-[calc(100%-112px)] overflow-y-auto pb-24">
      <AIProfileHero />
      <PersonalInfoForm />
      <RecoveryPreferences />
      <ConnectedSources />
    </main>
  );
}
