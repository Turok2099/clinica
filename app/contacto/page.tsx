import type { Metadata } from "next";
import ContactView from "@/views/contacto";

export const metadata: Metadata = {
  title: "Contacto | CIP - Clínica Integral del Peso",
  description: "Ponte en contacto con los especialistas de la Clínica Integral del Peso (CIP) y agenda tu valoración médica personalizada.",
};

export default function ContactPage() {
  return <ContactView />;
}
