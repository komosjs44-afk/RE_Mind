import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../src/context/AppContext';
import Header from '../../src/components/Header';
import AIProfileHero from '../../src/components/user/AIProfileHero';
import PersonalRhythmCard from '../../src/components/user/PersonalRhythmCard';
import PersonalInfoForm from '../../src/components/user/PersonalInfoForm';
import ConnectedSources from '../../src/components/user/ConnectedSources';
import Toast from '../../src/components/ui/Toast';

export default function UserScreen() {
  const { notifications, toast, closeToast } = useApp();

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <Header title="내 정보" notifications={notifications} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <AIProfileHero />
        <PersonalRhythmCard />
        <PersonalInfoForm />
        <ConnectedSources />
      </ScrollView>
      <Toast toast={toast} onClose={closeToast} />
    </SafeAreaView>
  );
}
