import { useState } from "react";
import { useStore } from "./context/StoreContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import BloodMeter from "./components/BloodMeter.jsx";
import SignatureBurger from "./components/SignatureBurger.jsx";
import MenuSection from "./components/MenuSection.jsx";
import MenuItemModal from "./components/MenuItemModal.jsx";
import StorySection from "./components/StorySection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";
import OrderTray from "./components/OrderTray.jsx";
import MatrixRain from "./components/MatrixRain.jsx";

function BloodDivider() {
  return (
    <svg className="blood-drips" viewBox="0 0 1200 44" preserveAspectRatio="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M0 0h1200v6c-40 0-46 14-60 14s-22-8-40-8-30 18-48 18-16-10-34-10-36 24-54 24-22-16-40-16-40 30-58 30-20-20-38-20-44 26-62 26-18-18-36-18-38 14-56 14-20-22-38-22-34 8-52 8-24-16-42-16-30 20-48 20-20-12-36-12-32 22-50 22-22-14-40-14-28 18-46 18-20-10-38-10-30 16-48 16-20-22-38-22-26 12-44 12-24-18-42-18-28 8-46 8-24-14-42-14-30 22-48 22-20-14-38-14-32 16-50 16-22-10-40-10-26 24-44 24-18-18-36-18-30 10-48 10z"
      />
      <circle cx="180" cy="36" r="4" fill="currentColor" />
      <circle cx="480" cy="30" r="3" fill="currentColor" />
      <circle cx="780" cy="38" r="5" fill="currentColor" />
      <circle cx="1020" cy="32" r="3.5" fill="currentColor" />
    </svg>
  );
}

export default function App() {
  const { theme } = useStore();
  const [trayOpen, setTrayOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="min-h-screen bg-app">
      {theme === "matrix" && <MatrixRain />}

      <Navbar onOpenTray={() => setTrayOpen(true)} />

      <main className="relative z-[1]">
        <Hero />
        <Marquee />
        <BloodMeter />
        <BloodDivider />
        <SignatureBurger />
        <MenuSection onOpenItem={setSelectedItem} />
        <StorySection />
        <ContactSection />
      </main>

      <Footer />

      <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      <OrderTray open={trayOpen} onClose={() => setTrayOpen(false)} />
    </div>
  );
}
