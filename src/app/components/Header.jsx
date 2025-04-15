'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="header">
      <div className="logo-title">
        <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="logo" />
        <h1 className="title">Smart Budget Tracker</h1>
      </div>
      <nav className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/reminders">Reminders</Link>
        <Link href="/budget">Budget Goals</Link>
      </nav>
    </header>
  );
}
