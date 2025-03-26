import Navbar from './components/navbar';
import Footer from './components/footer';
import BudgetTracker from './components/BudgetTracker';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <BudgetTracker />
      </main>
      <Footer />
    </div>
  );
}
