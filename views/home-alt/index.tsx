import Header from './Header';
import Hero from './Hero';
import Methodology from './Methodology';
import DoctorProfile from './DoctorProfile';
import Location from './Location';
import ContactForm from './ContactForm';
import Footer from './Footer';
import WhatsAppWidget from '../../components/WhatsAppWidget';

export default function HomeView() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Methodology />
        <DoctorProfile />
        <Location />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}

