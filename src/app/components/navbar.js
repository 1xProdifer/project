import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Image
          src="/logo.jpg"
          alt="App Logo"
          width={50}
          height={50}
          className="navbar-logo"
          priority
        />
      </div>
      <h1 className="navbar-title">Smart Budget Tracker</h1>
      <div className="nav-links">
        <Link href="/login">Login</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/budget-goals">Budget Goals</Link>
      </div>
    </nav>
  );
};

export default Navbar;
