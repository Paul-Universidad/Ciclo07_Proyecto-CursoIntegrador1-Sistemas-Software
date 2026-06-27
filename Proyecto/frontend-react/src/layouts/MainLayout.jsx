import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar.jsx";
import { Footer } from "../components/common/Footer.jsx";
import { Chatbot } from "../components/common/Chatbot.jsx";  // ← añadir

export function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="apf-page flex flex-col min-h-screen">
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Chatbot />  {}
    </>
  );
}