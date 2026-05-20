import Header from './Header';
import Hero from './Hero';
import Methodology from './Methodology';
import DoctorProfile from './DoctorProfile';
import Location from './Location';
import WhatsAppWidget from '../../components/WhatsAppWidget';

export default function HomeView() {
  return (
    <main>
      <Header />
      <Hero />
      <Methodology />
      <DoctorProfile />
      <Location />
      <WhatsAppWidget />
    </main>
  );
}

