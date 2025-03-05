import { useTranslation } from 'react-i18next';
import DutiesCalendar from './components/CalendarComponent';
import './i18n/config';
import { Namespace } from './i18n/namespaces';
import mockUser from './mockUser';
import ProfileView from './views/ProfileView/ProfileView';

const App = () => {
  const { t: tProfileView } = useTranslation(Namespace.profileView);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ProfileView user={mockUser} />
      <DutiesCalendar />
    </div>
  );
};

export default App;
