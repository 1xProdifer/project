import '../app/styles/globals.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

export const metadata = {
  title: 'Smart Budget Tracker',
  description: 'Track your budget efficiently and smartly',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="main-container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
