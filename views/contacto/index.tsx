import React from 'react';
import Header from '../home/Header';
import ContactForm from '../home/ContactForm';
import Footer from '../home/Footer';
import WhatsAppWidget from '../../components/WhatsAppWidget';

export default function ContactView() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-16 md:pt-24 bg-white">
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
