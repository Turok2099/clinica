import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import FightAlone from './FightAlone';
import Methodology from './Methodology';
import DoctorProfile from './DoctorProfile';
import Location from './Location';
import Footer from './Footer';
import WhatsAppWidget from '../../components/WhatsAppWidget';

export default function HomeView() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <FightAlone />
        <Methodology />
        <DoctorProfile />
        <Location />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}

