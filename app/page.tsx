import Header from "./components/Header";
import AboutMe from "./components/AboutMe";
import Currently from "./components/Currently";
import AccordionList from "./components/AccordionList";
import Terminal from "./components/Terminal";
import Achievements from "./components/Achievements";
import Footer from "./components/Footer";
import SectionLabel from "./components/SectionLabel";
import { previously, projects } from "./content";

export default function Home() {
  return (
    <main className="mx-auto max-w-content px-6 sm:px-8 py-16 sm:py-24">
      <Header />

      <AboutMe />

      <section className="mt-16">
        <SectionLabel>Projects</SectionLabel>
        <AccordionList items={projects} />
      </section>

      <Currently />

      <section className="mt-16">
        <SectionLabel>Previously</SectionLabel>
        <AccordionList items={previously} />
      </section>

      <section className="mt-16">
        <SectionLabel>Technical</SectionLabel>
        <Terminal />
      </section>

      <section className="mt-16">
        <SectionLabel>Achievements</SectionLabel>
        <Achievements />
      </section>

      <Footer />
    </main>
  );
}
