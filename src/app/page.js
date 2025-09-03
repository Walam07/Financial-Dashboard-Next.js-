import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";

export default function HomePage() {
  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Header />
      <Navbar />
      <Dashboard />
    </main>
  );
}