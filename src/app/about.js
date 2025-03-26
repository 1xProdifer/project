import Navbar from './components/navbar';
import Footer from './components/footer';

export default function About() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <h2>About Smart Budget Tracker</h2>
        <p>This app helps you track your income and expenses efficiently!</p>
      </main>
      <Footer />
    </div>
  );
}
