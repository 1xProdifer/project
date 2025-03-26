import Navbar from './components/navbar';
import Footer from './components/footer';

export default function Contact() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <h2>Contact Us</h2>
        <p>Email: support@budgettracker.com</p>
      </main>
      <Footer />
    </div>
  );
}
